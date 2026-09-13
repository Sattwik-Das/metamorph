//
//  CompanionScreenCaptureUtility.swift
//  leanring-buddy
//
//  Standalone screenshot capture for the companion voice flow.
//  Decoupled from the legacy ScreenshotManager so the companion mode
//  can capture screenshots independently without session state.
//

import AppKit
import ScreenCaptureKit

struct CompanionScreenCapture {
    let imageData: Data
    let label: String
    let isCursorScreen: Bool
    let displayWidthInPoints: Int
    let displayHeightInPoints: Int
    let displayFrame: CGRect
    let screenshotWidthInPixels: Int
    let screenshotHeightInPixels: Int
}

@MainActor
enum CompanionScreenCaptureUtility {

    /// Captures all connected displays as JPEG data, labeling each with
    /// whether the user's cursor is on that screen. This gives the AI
    /// full context across multiple monitors.
    static func captureAllScreensAsJPEG(cursorLocation: CGPoint? = nil) async throws -> [CompanionScreenCapture] {
        let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: true)

        guard !content.displays.isEmpty else {
            throw NSError(domain: "CompanionScreenCapture", code: -1,
                          userInfo: [NSLocalizedDescriptionKey: "No display available for capture"])
        }

        let mouseLocation = cursorLocation ?? NSEvent.mouseLocation

        // We no longer exclude own windows so that Claude can see the Magical Ink
        // drawn on the transparent overlay window.

        // Build a lookup from display ID to NSScreen so we can use AppKit-coordinate
        // frames instead of CG-coordinate frames. NSEvent.mouseLocation and NSScreen.frame
        // both use AppKit coordinates (bottom-left origin), while SCDisplay.frame uses
        // Core Graphics coordinates (top-left origin). On multi-display setups, the Y
        // origins differ for secondary displays, which breaks cursor-contains checks
        // and downstream coordinate conversions.
        var nsScreenByDisplayID: [CGDirectDisplayID: NSScreen] = [:]
        for screen in NSScreen.screens {
            if let screenNumber = screen.deviceDescription[NSDeviceDescriptionKey("NSScreenNumber")] as? CGDirectDisplayID {
                nsScreenByDisplayID[screenNumber] = screen
            }
        }

        // Sort displays so the cursor screen is always first
        let sortedDisplays = content.displays.sorted { displayA, displayB in
            let frameA = nsScreenByDisplayID[displayA.displayID]?.frame ?? displayA.frame
            let frameB = nsScreenByDisplayID[displayB.displayID]?.frame ?? displayB.frame
            let aContainsCursor = frameA.contains(mouseLocation)
            let bContainsCursor = frameB.contains(mouseLocation)
            if aContainsCursor != bContainsCursor { return aContainsCursor }
            return false
        }

        var capturedScreens: [CompanionScreenCapture] = []

        for (displayIndex, display) in sortedDisplays.enumerated() {
            // Use NSScreen.frame (AppKit coordinates, bottom-left origin) so
            // displayFrame is in the same coordinate system as NSEvent.mouseLocation
            // and the overlay window's screenFrame in BlueCursorView.
            let displayFrame = nsScreenByDisplayID[display.displayID]?.frame
                ?? CGRect(x: display.frame.origin.x, y: display.frame.origin.y,
                          width: CGFloat(display.width), height: CGFloat(display.height))
            let isCursorScreen = displayFrame.contains(mouseLocation)

            let filter = SCContentFilter(display: display, excludingWindows: [])

            let configuration = SCStreamConfiguration()
            configuration.showsCursor = true
            
            let maxDimension = 1280
            let aspectRatio = CGFloat(display.width) / CGFloat(display.height)
            if display.width >= display.height {
                configuration.width = maxDimension
                configuration.height = Int(CGFloat(maxDimension) / aspectRatio)
            } else {
                configuration.height = maxDimension
                configuration.width = Int(CGFloat(maxDimension) * aspectRatio)
            }

            let cgImage = try await SCScreenshotManager.captureImage(
                contentFilter: filter,
                configuration: configuration
            )

            var finalCGImage = cgImage
            
            // Draw a prominent blue crosshair circle at the cursor location if the cursor is on this screen
            if isCursorScreen {
                let colorSpace = CGColorSpaceCreateDeviceRGB()
                let bitmapInfo = CGImageAlphaInfo.premultipliedLast.rawValue
                if let context = CGContext(data: nil, width: configuration.width, height: configuration.height, bitsPerComponent: 8, bytesPerRow: 0, space: colorSpace, bitmapInfo: bitmapInfo) {
                    
                    let rect = CGRect(x: 0, y: 0, width: configuration.width, height: configuration.height)
                    context.draw(cgImage, in: rect)
                    
                    // Map screenPoint (AppKit bottom-left origin) to image coordinates.
                    // displayFrame is also AppKit coordinates.
                    let xOffset = mouseLocation.x - displayFrame.origin.x
                    // For CGContext with default bottom-left origin:
                    let yOffset = mouseLocation.y - displayFrame.origin.y
                    
                    let xScale = CGFloat(configuration.width) / displayFrame.width
                    let yScale = CGFloat(configuration.height) / displayFrame.height
                    
                    let imageX = xOffset * xScale
                    let imageY = yOffset * yScale
                    
                    let radius: CGFloat = 30.0 * xScale
                    let circleRect = CGRect(x: imageX - radius, y: imageY - radius, width: radius * 2, height: radius * 2)
                    
                    let blueColor = NSColor(red: 0.0, green: 0.6, blue: 1.0, alpha: 1.0).cgColor
                    
                    context.setStrokeColor(blueColor)
                    context.setLineWidth(4.0 * xScale)
                    context.strokeEllipse(in: circleRect)
                    
                    // Draw crosshair lines
                    context.beginPath()
                    context.move(to: CGPoint(x: imageX, y: imageY - radius - 15 * xScale))
                    context.addLine(to: CGPoint(x: imageX, y: imageY + radius + 15 * xScale))
                    context.move(to: CGPoint(x: imageX - radius - 15 * xScale, y: imageY))
                    context.addLine(to: CGPoint(x: imageX + radius + 15 * xScale, y: imageY))
                    context.strokePath()
                    
                    // Center dot
                    let dotRadius: CGFloat = 4.0 * xScale
                    context.setFillColor(blueColor)
                    context.fillEllipse(in: CGRect(x: imageX - dotRadius, y: imageY - dotRadius, width: dotRadius * 2, height: dotRadius * 2))
                    
                    // Subtle glowing fill
                    context.setFillColor(NSColor(red: 0.0, green: 0.6, blue: 1.0, alpha: 0.2).cgColor)
                    context.fillEllipse(in: circleRect)
                    
                    if let drawnImage = context.makeImage() {
                        finalCGImage = drawnImage
                    }
                }
            }

            guard let jpegData = NSBitmapImageRep(cgImage: finalCGImage)
                    .representation(using: .jpeg, properties: [.compressionFactor: 0.8]) else {
                continue
            }

            let screenLabel: String
            if sortedDisplays.count == 1 {
                screenLabel = "user's screen (cursor is here)"
            } else if isCursorScreen {
                screenLabel = "screen \(displayIndex + 1) of \(sortedDisplays.count) — cursor is on this screen (primary focus)"
            } else {
                screenLabel = "screen \(displayIndex + 1) of \(sortedDisplays.count) — secondary screen"
            }

            capturedScreens.append(CompanionScreenCapture(
                imageData: jpegData,
                label: screenLabel,
                isCursorScreen: isCursorScreen,
                displayWidthInPoints: Int(displayFrame.width),
                displayHeightInPoints: Int(displayFrame.height),
                displayFrame: displayFrame,
                screenshotWidthInPixels: configuration.width,
                screenshotHeightInPixels: configuration.height
            ))
        }

        guard !capturedScreens.isEmpty else {
            throw NSError(domain: "CompanionScreenCapture", code: -2,
                          userInfo: [NSLocalizedDescriptionKey: "Failed to capture any screen"])
        }

        return capturedScreens
    }
}
