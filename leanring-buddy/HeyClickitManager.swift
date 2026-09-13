//
//  HeyClickitManager.swift
//  leanring-buddy
//
//  "Hey Clickit" hands-free wake-word voice assistant.
//
//  Pipeline:
//    Microphone → AssemblyAI STT → wake-word detection → command capture
//    → Gemini intent (/api/hey-clicky/intent) → validated action executor
//    → ElevenLabs TTS → audio playback → back to wake-word listening
//
//  This class manages an entirely separate always-on microphone session from
//  the existing push-to-talk pipeline. The two coexist: push-to-talk uses
//  BuddyDictationManager; Hey Clickit uses its own audio engine instance so
//  neither blocks the other.
//

import AVFoundation
import Foundation
import SwiftUI
import Combine

// MARK: - State Machine

/// All states the Hey Clickit assistant can be in.
enum HeyClickitState: Equatable {
    case disabled               // User has turned the feature off
    case idle                   // Mic session open, waiting for wake word
    case listeningForCommand    // Wake word heard, listening for the command
    case thinking               // Command sent to Gemini, awaiting structured response
    case executing              // Gemini response received, running the action
    case speaking               // ElevenLabs audio is playing
    case error(String)          // Recoverable error; returns to idle after a moment

    static func == (lhs: HeyClickitState, rhs: HeyClickitState) -> Bool {
        switch (lhs, rhs) {
        case (.disabled, .disabled): return true
        case (.idle, .idle): return true
        case (.listeningForCommand, .listeningForCommand): return true
        case (.thinking, .thinking): return true
        case (.executing, .executing): return true
        case (.speaking, .speaking): return true
        case (.error(let a), .error(let b)): return a == b
        default: return false
        }
    }

    var displayLabel: String {
        switch self {
        case .disabled:             return "Hey Clickit off"
        case .idle:                 return "Say \"Hey Clickit\"…"
        case .listeningForCommand:  return "Listening…"
        case .thinking:             return "Thinking…"
        case .executing:            return "On it…"
        case .speaking:             return "Speaking…"
        case .error(let msg):       return msg
        }
    }
}

// MARK: - Gemini Intent Response

struct HeyClickitIntentResponse: Decodable {
    let action: String
    let speech: String
    let parameters: [String: String]

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        action = try container.decode(String.self, forKey: .action)
        speech = try container.decodeIfPresent(String.self, forKey: .speech) ?? ""
        parameters = (try? container.decodeIfPresent([String: String].self, forKey: .parameters)) ?? [:]
    }

    enum CodingKeys: String, CodingKey { case action, parameters, speech }
}

// MARK: - Manager

@MainActor
final class HeyClickitManager: NSObject, ObservableObject {

    // MARK: Published State

    @Published private(set) var state: HeyClickitState = .disabled
    @Published private(set) var isEnabled: Bool = UserDefaults.standard.bool(forKey: "heyClickitEnabled") {
        didSet { UserDefaults.standard.set(isEnabled, forKey: "heyClickitEnabled") }
    }

    // MARK: Dependencies

    /// Invoked when a validated action should be executed by the parent CompanionManager.
    var onActionReceived: ((String, [String: String]) -> Void)?

    // MARK: Private Constants

    private static let intentProxyURL = "http://localhost:8000/api/hey-clicky/intent"
    private static let ttsProxyURL = "http://localhost:8000/api/tts"
    private static let wakeWordVariants: [String] = [
        "hey clickit", "hey clicky", "hey click it", "hey, clickit", "hey, clicky"
    ]
    private static let commandListeningTimeoutSeconds: TimeInterval = 8.0
    private static let errorRecoveryDelaySeconds: TimeInterval = 3.0

    // MARK: Private State

    private let wakeWordAudioEngine = AVAudioEngine()
    private var wakeWordTranscriptionSession: (any BuddyStreamingTranscriptionSession)?
    private let transcriptionProvider = AssemblyAIStreamingTranscriptionProvider()
    private var currentCommandTranscript: String = ""
    private var commandTimeoutTask: Task<Void, Never>?
    private var ttsAudioPlayer: AVAudioPlayer?
    private var ttsWasInterrupted = false

    // MARK: - Enable / Disable

    func enable() {
        guard !isEnabled else { return }
        isEnabled = true
        Task { await startWakeWordListening() }
    }

    func disable() {
        isEnabled = false
        stopWakeWordListening()
        state = .disabled
    }

    func toggle() {
        if isEnabled { disable() } else { enable() }
    }

    func startIfPreviouslyEnabled() {
        guard isEnabled else { state = .disabled; return }
        Task { await startWakeWordListening() }
    }

    // MARK: - Wake Word Listening

    private func startWakeWordListening() async {
        guard isEnabled else { return }
        guard state != .listeningForCommand && state != .thinking
                && state != .executing && state != .speaking else { return }

        guard await requestMicrophonePermissionIfNeeded() else {
            state = .error("Microphone permission required")
            return
        }

        do {
            try await openWakeWordTranscriptionSession()
            state = .idle
            print("🎤 Hey Clickit: wake-word listening started")
        } catch {
            print("❌ Hey Clickit: failed to start wake-word session: \(error)")
            state = .error("Mic start failed")
            scheduleErrorRecovery()
        }
    }

    private func stopWakeWordListening() {
        commandTimeoutTask?.cancel()
        commandTimeoutTask = nil
        wakeWordAudioEngine.stop()
        wakeWordAudioEngine.inputNode.removeTap(onBus: 0)
        wakeWordTranscriptionSession?.cancel()
        wakeWordTranscriptionSession = nil
        currentCommandTranscript = ""
    }

    private func openWakeWordTranscriptionSession() async throws {
        wakeWordTranscriptionSession?.cancel()
        wakeWordTranscriptionSession = nil
        wakeWordAudioEngine.stop()
        wakeWordAudioEngine.inputNode.removeTap(onBus: 0)

        let keyterms = ["Hey Clickit", "Hey Clicky", "clickit", "show panel", "hide panel", "toggle cursor"]

        let session = try await transcriptionProvider.startStreamingSession(
            keyterms: keyterms,
            onTranscriptUpdate: { [weak self] partial in
                Task { @MainActor in self?.handlePartialTranscript(partial) }
            },
            onFinalTranscriptReady: { [weak self] final in
                Task { @MainActor in self?.handleFinalTranscript(final) }
            },
            onError: { [weak self] error in
                Task { @MainActor in self?.handleTranscriptionError(error) }
            }
        )
        wakeWordTranscriptionSession = session

        let inputNode = wakeWordAudioEngine.inputNode
        let inputFormat = inputNode.outputFormat(forBus: 0)
        inputNode.removeTap(onBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: inputFormat) { [weak self] buffer, _ in
            self?.wakeWordTranscriptionSession?.appendAudioBuffer(buffer)
        }
        wakeWordAudioEngine.prepare()
        try wakeWordAudioEngine.start()
    }

    // MARK: - Transcript Handling

    private func handlePartialTranscript(_ partial: String) {
        switch state {
        case .idle:
            if containsWakeWord(partial) {
                print("🎤 Hey Clickit: wake word detected in: \"\(partial)\"")
                handleWakeWordDetected()
            }
        case .listeningForCommand:
            currentCommandTranscript = stripWakeWordPrefix(from: partial)
        default:
            if containsWakeWord(partial) { handleBargeIn() }
        }
    }

    private func handleFinalTranscript(_ final: String) {
        switch state {
        case .listeningForCommand:
            let commandText = stripWakeWordPrefix(from: final).trimmingCharacters(in: .whitespacesAndNewlines)
            guard !commandText.isEmpty else {
                speakAndReturn("Yes? What can I do for you?")
                return
            }
            print("🎤 Hey Clickit: final command: \"\(commandText)\"")
            commandTimeoutTask?.cancel()
            commandTimeoutTask = nil
            processCommand(commandText)
        case .idle:
            if containsWakeWord(final) { handleWakeWordDetected() }
        default:
            break
        }
    }

    private func handleTranscriptionError(_ error: Error) {
        guard state != .disabled else { return }
        print("❌ Hey Clickit: transcription error: \(error)")
        state = .error("Mic error, reconnecting…")
        scheduleErrorRecovery()
    }

    // MARK: - Wake Word Detection

    private func containsWakeWord(_ text: String) -> Bool {
        let lower = text.lowercased()
        return Self.wakeWordVariants.contains { lower.contains($0) }
    }

    private func stripWakeWordPrefix(from transcript: String) -> String {
        let lower = transcript.lowercased()
        for variant in Self.wakeWordVariants {
            if let range = lower.range(of: variant) {
                let after = transcript[range.upperBound...].trimmingCharacters(in: .whitespacesAndNewlines)
                return String(after.drop(while: { $0 == "," || $0 == "." || $0 == " " }))
            }
        }
        return transcript
    }

    // MARK: - Wake Word Activated

    private func handleWakeWordDetected() {
        stopTTSPlayback()
        state = .listeningForCommand
        currentCommandTranscript = ""

        Task { await speakText("Yes?", waitForCompletion: false) }

        commandTimeoutTask?.cancel()
        commandTimeoutTask = Task {
            do {
                try await Task.sleep(for: .seconds(Self.commandListeningTimeoutSeconds))
                guard !Task.isCancelled else { return }
                guard self.state == .listeningForCommand else { return }
                print("🎤 Hey Clickit: command timeout, returning to idle")
                self.state = .idle
                self.currentCommandTranscript = ""
            } catch {}
        }
    }

    private func handleBargeIn() {
        print("🎤 Hey Clickit: barge-in while \(state)")
        stopTTSPlayback()
        ttsWasInterrupted = true
        state = .listeningForCommand
        currentCommandTranscript = ""
    }

    // MARK: - Command Processing

    private func processCommand(_ command: String) {
        state = .thinking
        Task { await sendCommandToGemini(command) }
    }

    private func sendCommandToGemini(_ command: String) async {
        guard let url = URL(string: Self.intentProxyURL) else {
            await handleIntentError("Invalid intent URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.timeoutInterval = 15.0

        guard let bodyData = try? JSONSerialization.data(withJSONObject: ["command": command]) else {
            await handleIntentError("Failed to encode command")
            return
        }
        request.httpBody = bodyData

        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode) else {
                let statusCode = (response as? HTTPURLResponse)?.statusCode ?? -1
                await handleIntentError("Intent API error (HTTP \(statusCode))")
                return
            }
            do {
                let intentResponse = try JSONDecoder().decode(HeyClickitIntentResponse.self, from: data)
                print("🧠 Hey Clickit: action=\(intentResponse.action), speech=\"\(intentResponse.speech)\"")
                await executeAction(intentResponse)
            } catch {
                await handleIntentError("Couldn't parse Gemini response")
            }
        } catch {
            await handleIntentError("Network error: \(error.localizedDescription)")
        }
    }

    // MARK: - Action Execution

    private func executeAction(_ intentResponse: HeyClickitIntentResponse) async {
        state = .executing
        // Notify parent to run the action
        onActionReceived?(intentResponse.action, intentResponse.parameters)
        // Speak the response
        await speakText(intentResponse.speech, waitForCompletion: true)
        returnToIdle()
    }

    private func handleIntentError(_ reason: String) async {
        print("❌ Hey Clickit: intent error — \(reason)")
        await speakText("Sorry, something went wrong.", waitForCompletion: true)
        returnToIdle()
    }

    private func returnToIdle() {
        commandTimeoutTask?.cancel()
        commandTimeoutTask = nil
        currentCommandTranscript = ""
        guard isEnabled else { state = .disabled; return }
        state = .idle
    }

    // MARK: - Error Recovery

    private func scheduleErrorRecovery() {
        Task {
            do {
                try await Task.sleep(for: .seconds(Self.errorRecoveryDelaySeconds))
                guard !Task.isCancelled, self.isEnabled else { return }
                print("🎤 Hey Clickit: recovering, restarting mic session")
                await self.startWakeWordListening()
            } catch {}
        }
    }

    // MARK: - ElevenLabs TTS

    private func speakText(_ text: String, waitForCompletion: Bool) async {
        guard !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        state = .speaking

        guard let url = URL(string: Self.ttsProxyURL) else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.timeoutInterval = 20.0

        let ttsBody: [String: Any] = ["text": text, "model_id": "eleven_turbo_v2_5"]
        guard let bodyData = try? JSONSerialization.data(withJSONObject: ttsBody) else { return }
        request.httpBody = bodyData

        do {
            let (audioData, response) = try await URLSession.shared.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode),
                  !audioData.isEmpty else {
                print("❌ Hey Clickit: TTS request failed")
                return
            }

            ttsWasInterrupted = false
            let tempURL = FileManager.default.temporaryDirectory
                .appendingPathComponent("hey_clickit_tts_\(UUID().uuidString).mp3")
            try audioData.write(to: tempURL)

            let player = try AVAudioPlayer(contentsOf: tempURL)
            ttsAudioPlayer = player
            player.prepareToPlay()
            player.play()

            if waitForCompletion {
                while player.isPlaying && !ttsWasInterrupted {
                    try await Task.sleep(for: .milliseconds(100))
                }
                player.stop()
            }
            try? FileManager.default.removeItem(at: tempURL)
        } catch {
            print("❌ Hey Clickit: TTS error: \(error)")
        }
    }

    private func stopTTSPlayback() {
        ttsAudioPlayer?.stop()
        ttsAudioPlayer = nil
        ttsWasInterrupted = true
    }

    private func speakAndReturn(_ text: String) {
        Task {
            await speakText(text, waitForCompletion: true)
            returnToIdle()
        }
    }

    // MARK: - Microphone Permission

    private func requestMicrophonePermissionIfNeeded() async -> Bool {
        switch AVCaptureDevice.authorizationStatus(for: .audio) {
        case .authorized: return true
        case .notDetermined:
            return await withCheckedContinuation { continuation in
                AVCaptureDevice.requestAccess(for: .audio) { granted in
                    continuation.resume(returning: granted)
                }
            }
        default: return false
        }
    }
}
