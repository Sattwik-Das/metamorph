//
//  CursorTourManager.swift
//  leanring-buddy
//
//  Manages the step-by-step cursor tour that plays after Claude returns
//  multiple [BOX:] coordinates in its response.
//
//  The tour visits each step in sequence:
//    1. Cursor flies (bezier arc) to the element on screen
//    2. A dotted-rectangle highlight appears around the element
//    3. A numbered speech bubble streams in character by character
//    4. After 2.5 seconds the tour advances to the next step
//    5. A dashed connector line is drawn between consecutive visited steps
//
//  BlueCursorView in OverlayWindow.swift observes this manager's
//  published state to drive all visual rendering.
//

import AppKit
import Foundation
import SwiftUI
import Combine

// MARK: - Data Types

/// A single step in a cursor tour.
struct CursorTourStep: Identifiable {
    let id = UUID()

    /// 1-based index (step 1, step 2, …)
    let stepNumber: Int

    /// Total number of steps in this tour.
    let totalSteps: Int

    /// The target location in AppKit global coordinates (bottom-left origin),
    /// corresponding to the center of the [BOX:] bounding box.
    let globalTargetLocation: CGPoint

    /// The full bounding box in AppKit global coordinates.
    /// This is what gets drawn as the dotted rectangle highlight.
    let globalBoundingBox: CGRect

    /// Which screen this step lives on (AppKit global frame).
    let targetScreenFrame: CGRect

    /// Short label from Claude's response (e.g. "save button").
    let label: String

    /// How long the cursor lingers at this step before advancing (seconds).
    let dwellDurationSeconds: TimeInterval = 2.5
}

/// A connector line drawn between two visited tour steps.
/// Both points are in SwiftUI local coordinates (relative to the screen overlay).
struct TourConnectorLine: Identifiable {
    let id = UUID()
    let fromPoint: CGPoint   // center of the FROM bounding box, SwiftUI coords
    let toPoint: CGPoint     // center of the TO bounding box, SwiftUI coords
}

// MARK: - CursorTourManager

@MainActor
final class CursorTourManager: ObservableObject {

    // MARK: Published State (observed by BlueCursorView)

    /// The tour step the cursor is currently visiting (or about to visit), or nil if no tour is running.
    @Published private(set) var currentStep: CursorTourStep?

    /// All steps that have already been visited (for drawing connector lines and
    /// showing persistent dotted boxes on completed steps).
    @Published private(set) var visitedSteps: [CursorTourStep] = []

    /// True while a tour is actively running (used to keep the overlay interactive).
    @Published private(set) var isRunning: Bool = false

    /// The label text currently being streamed into the step bubble.
    @Published private(set) var currentStepBubbleText: String = ""

    /// Opacity of the step bubble (0→1 when cursor arrives, 0 when leaving).
    @Published private(set) var currentStepBubbleOpacity: Double = 0.0

    // MARK: Private

    /// All remaining steps that haven't been visited yet.
    private var remainingSteps: [CursorTourStep] = []

    /// Task that drives the dwell timer and step advancement.
    private var dwellTask: Task<Void, Never>?

    /// Callback invoked when the tour needs the cursor to navigate to a global location.
    /// CompanionManager wires this up to detectedElementScreenLocation / detectedElementDisplayFrame.
    var onNavigateToStep: ((CursorTourStep) -> Void)?

    /// Callback invoked when the entire tour completes or is cancelled.
    var onTourCompleted: (() -> Void)?

    // MARK: - Public Interface

    /// Starts a multi-step cursor tour. Replaces any previously running tour.
    /// - Parameter steps: The ordered list of tour steps to visit.
    func startTour(steps: [CursorTourStep]) {
        guard !steps.isEmpty else { return }
        cancelTour(shouldFireCompletionCallback: false)

        remainingSteps = steps
        visitedSteps = []
        isRunning = true
        print("🎯 CursorTour: starting tour with \(steps.count) step(s)")
        advanceToNextStep()
    }

    /// Cancels the current tour immediately and resets all state.
    func cancelTour(shouldFireCompletionCallback: Bool = true) {
        dwellTask?.cancel()
        dwellTask = nil
        remainingSteps = []
        currentStep = nil
        visitedSteps = []
        currentStepBubbleText = ""
        currentStepBubbleOpacity = 0.0
        isRunning = false
        if shouldFireCompletionCallback {
            onTourCompleted?()
        }
    }

    // MARK: - Step Advancement

    private func advanceToNextStep() {
        guard !remainingSteps.isEmpty else {
            // All steps visited — tour complete
            print("🎯 CursorTour: tour complete")
            currentStepBubbleOpacity = 0.0
            currentStep = nil
            isRunning = false
            onTourCompleted?()
            return
        }

        let nextStep = remainingSteps.removeFirst()
        currentStep = nextStep
        currentStepBubbleText = ""
        currentStepBubbleOpacity = 0.0

        print("🎯 CursorTour: step \(nextStep.stepNumber)/\(nextStep.totalSteps) → \"\(nextStep.label)\"")

        // Tell the overlay to fly the cursor to this step's location
        onNavigateToStep?(nextStep)

        // The dwell + advance is triggered AFTER the cursor has arrived.
        // BlueCursorView calls notifyCursorArrived() when the flight animation completes.
    }

    /// Called by BlueCursorView when the flight animation for the current step has completed.
    /// Starts streaming the step label into the bubble, then dwells before advancing.
    func notifyCursorArrived(atStep step: CursorTourStep) {
        guard let currentStep, currentStep.id == step.id else { return }

        // Mark this step as visited (for persistent box + connector rendering)
        visitedSteps.append(step)

        // Fade the bubble in and stream the step label
        currentStepBubbleOpacity = 1.0
        let labelText = stepBubbleLabel(for: step)
        streamBubbleText(labelText, stepId: step.id)

        // After the dwell period, advance to the next step
        dwellTask = Task {
            do {
                try await Task.sleep(for: .seconds(step.dwellDurationSeconds))
                guard !Task.isCancelled else { return }
                await MainActor.run {
                    self.currentStepBubbleOpacity = 0.0
                }
                // Brief pause for bubble fade-out before flying to next step
                try await Task.sleep(for: .milliseconds(300))
                guard !Task.isCancelled else { return }
                await MainActor.run {
                    self.advanceToNextStep()
                }
            } catch {}
        }
    }

    // MARK: - Bubble Text Streaming

    private func streamBubbleText(_ text: String, stepId: UUID) {
        var index = text.startIndex
        streamNextCharacter(text: text, index: index, stepId: stepId)
    }

    private func streamNextCharacter(text: String, index: String.Index, stepId: UUID) {
        guard let currentStep, currentStep.id == stepId else { return }
        guard index < text.endIndex else { return }

        currentStepBubbleText.append(text[index])

        let nextIndex = text.index(after: index)
        let delay = Double.random(in: 0.025...0.055)
        DispatchQueue.main.asyncAfter(deadline: .now() + delay) { [weak self] in
            self?.streamNextCharacter(text: text, index: nextIndex, stepId: stepId)
        }
    }

    // MARK: - Label Formatting

    /// Formats the text that appears in the step bubble.
    /// Example: "Step 1 of 3 — save button"
    private func stepBubbleLabel(for step: CursorTourStep) -> String {
        let stepIndicator = step.totalSteps > 1
            ? "Step \(step.stepNumber) of \(step.totalSteps)"
            : "Here"
        let label = step.label.trimmingCharacters(in: .whitespacesAndNewlines)
        return label.isEmpty ? stepIndicator : "\(stepIndicator) — \(label)"
    }
}
