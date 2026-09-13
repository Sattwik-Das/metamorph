# Clickit - The AI Sidekick for macOS

Clickit is a zero-friction, native macOS AI companion that lives in your menu bar. Using a global push-to-talk hotkey, Clickit can see your screen, transcribe your voice commands in real-time, and chat with state-of-the-art AI models like Claude 3.5 Sonnet to help you work smarter and faster.

It doesn't just tell you the answer—it points it out. When Claude references UI elements on your screen, Clickit's "Magical Cursor" overlay will physically point to them on your actual desktop.

## ✨ Features

- **Push-to-Talk AI**: Use `Ctrl + Option` from anywhere in macOS to talk to your companion.
- **Spatially-Aware Vision**: Automatically captures the context of your active screen to "see what you see".
- **Magical Cursor**: A custom transparent overlay cursor that physically points to UI elements, buttons, and assets mentioned in the AI's response.
- **Lightning Fast STT & TTS**: Powered by AssemblyAI's streaming real-time transcription and ElevenLabs' ultra-low latency voice models.
- **Native macOS Experience**: Built in Swift and AppKit. Runs completely out of the way in your status bar.
- **Secure Architecture**: All external API calls are proxied through a Cloudflare Worker, meaning no sensitive API keys are stored in the app bundle.

## 🛠 Tech Stack

### Client Applications
- **macOS Native Companion App (`leanring-buddy`)**
  - **Swift & SwiftUI**: The core language and UI framework.
  - **AppKit**: Manages the borderless floating menu-bar panel and the full-screen transparent cursor overlay.
  - **ScreenCaptureKit**: Apple's modern framework for capturing multi-monitor screenshots for AI visual context.
  - **AVFoundation**: Powers the push-to-talk voice capture pipeline.
  - **CoreGraphics**: Uses `CGEvent` taps to create a reliable system-wide global shortcut monitor.
- **Web Landing Page (`metamorph`)**
  - **React & Vite**: Frontend framework and build tool.
  - **Tailwind CSS & Framer Motion**: Styling, layout, and choreographed scroll animations.
  - **Vercel**: For seamless production deployment.

### Backend & Infrastructure
- **Python & FastAPI**: A lightweight local backend proxy.
- **Cloudflare Workers**: Acts as a secure edge proxy layer. All external API requests route through the worker, keeping API keys out of the client.

### AI Models & External APIs
- **Anthropic Claude API (Sonnet 3.5)**: The core "brain" and vision engine. Analyzes screen context and streams back responses with spatial coordinates to drive the Magical Cursor.
- **Google Gemini API (Gemini 1.5 Flash)**: Used via the Python backend as a blazing-fast multimodal fallback.
- **AssemblyAI Real-Time API (`u3-rt-pro`)**: Powers ultra-low latency, streaming speech-to-text via WebSockets.
- **ElevenLabs API (`eleven_flash_v2_5`)**: Provides the natural, conversational Text-to-Speech voice for the companion's spoken responses.

## 🚀 Getting Started

### 1. Set up the Cloudflare Worker Proxy
The app uses a Cloudflare Worker proxy so API keys are never shipped in the client.

```bash
cd worker
npm install
```

Add your API secrets using Wrangler:
```bash
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put ASSEMBLYAI_API_KEY
npx wrangler secret put ELEVENLABS_API_KEY
```

Set your ElevenLabs Voice ID in `wrangler.toml`:
```toml
[vars]
ELEVENLABS_VOICE_ID = "your-voice-id-here"
```

Deploy the worker:
```bash
npx wrangler deploy
```

### 2. Update Proxy URLs
Copy your deployed Worker URL (e.g., `https://your-worker.your-subdomain.workers.dev`) and replace the hardcoded `workerBaseURL` references in the Swift project:
- `CompanionManager.swift`
- `AssemblyAIStreamingTranscriptionProvider.swift`

### 3. Build the macOS App
Open the project in Xcode:
```bash
open leanring-buddy.xcodeproj
```
1. Select the `leanring-buddy` scheme.
2. Set your Apple Developer signing team under **Signing & Capabilities**.
3. Press **Cmd + R** to build and run.

### 4. Grant Permissions
On first launch, Clickit will ask for the following macOS permissions:
- **Microphone**: To capture push-to-talk audio.
- **Accessibility**: To register the global `Ctrl + Option` keyboard shortcut.
- **Screen Recording**: To capture screen context via ScreenCaptureKit.

## 📄 License
This project is open-source under the MIT License. Feel free to fork, hack, and build your own features!
