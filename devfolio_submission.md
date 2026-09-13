# Tagline Options
- A zero-friction, native macOS sidekick bridging multimodal AI reasoning with system-level spatial awareness.
- Redefining human-computer interaction through non-intrusive, context-aware visual guidance.
- An autonomous, spatially-aware AI sidekick operating seamlessly at the operating system level.
- Translating multimodal inference into physical UI interactions via a frictionless native macOS architecture.

---

# The Problem It Solves

Modern screen-sharing AI assistants and digital sidekicks offer substantial utility, yet they inherently disrupt the user experience. They typically require a dedicated main window, consume dock real estate, interrupt active window focus, and introduce significant friction into established workflows.

**CLICKit** resolves this by providing a zero-friction, context-aware AI sidekick designed specifically for macOS, operating entirely in the background via the system menu bar.

### Core Value Propositions:
- **Unobtrusive Architecture:** Engineered as a native macOS `LSUIElement` application, CLICKit operates invisibly in the background. It possesses no dock icon and guarantees zero interference with the user's active window focus or current tasks.
- **On-Demand Contextual Vision:** Through a system-wide CoreGraphics event monitor (triggered via `Ctrl + Option`), CLICKit instantly captures microphone audio and multi-monitor screen context without disrupting the active workflow.
- **The "Magical Cursor" UI Annotation System:** Moving beyond basic text or synthesized voice responses, CLICKit physically directs the user's attention. Leveraging multimodal reasoning (powered by Gemini 2.0 Flash and Claude), the application identifies specific UI elements and computes precise spatial coordinates. It then animates a transient, non-activating blue cursor overlay that traces paths and draws bounding boxes around targeted interface components.
- **Low-Latency Integration:** CLICKit combines real-time streaming Speech-to-Text (AssemblyAI) with ultra-low latency voice synthesis (ElevenLabs) to deliver a fluid, conversational interface.

Whether engineers are debugging localized code, navigating dense IDEs such as Xcode, or users require spatial orientation within complex interfaces, CLICKit analyzes the visual context and physically highlights the solution—allowing users to retain uninterrupted control of their primary input devices.

---

# Challenges We Ran Into

Developing a system-level macOS application that unifies real-time audio streaming, multi-display screen capture, and multimodal AI presented several complex engineering hurdles:

1. **Spatial Coordinate Mapping for the "Magical Cursor":** 
   Our backend vision models generate bounding box coordinates relative to the captured image buffer. Translating these AI-generated coordinates onto a transparent, full-screen overlay across multiple physical displays with disparate scaling factors (Retina vs. standard DPI) proved highly complex. We engineered a custom, non-activating `NSPanel` overlay that spans all active macOS Spaces, utilizing Bezier path interpolation to smoothly animate the cursor to the precise target destination.

2. **System-Wide Event Hooking & TCC Entitlements:** 
   Implementing a global push-to-talk mechanism (`Ctrl + Option`) without stealing application focus required bypassing standard AppKit event monitors. We utilized a listen-only `CGEvent` tap at the CoreGraphics level. Navigating Apple's stringent Transparency, Consent, and Control (TCC) framework for Screen Recording and Accessibility was a persistent challenge, as iterative local builds frequently invalidated our security entitlements during development.

3. **Concurrency and Audio Buffer Management:** 
   We implemented real-time audio streaming to AssemblyAI via websockets using `AVAudioEngine`. Initially, integrating an always-on "wake word" listener alongside the on-demand push-to-talk feature caused severe audio session conflicts, resulting in hardware microphone locks. We resolved this by decoupling the audio streams and architecting a robust state machine (`CompanionManager`) to securely manage transitions between listening, processing, and idle states without dropping PCM buffers.

4. **SSE Streaming & API Proxy Architecture:** 
   To secure external API keys and minimize frontend processing overhead, we developed a custom backend proxy using Python (FastAPI). Handling asynchronous Server-Sent Events (SSE) from the AI models, parsing custom coordinate tags (`[BOX:x,y,w,h]`) in real-time, and orchestrating ElevenLabs TTS playback required strict concurrent timing to guarantee the macOS main thread remained unblocked while the AI processed inferences.

---

# How it fits the Trace Commons "AI as a Partner" Track

The **Trace Commons "AI as a Partner" Track** champions projects that elevate artificial intelligence from a mere utility to a foundational collaborator in the engineering process. **CLICKit** serves as a premier example of this paradigm shift.

Throughout the lifecycle of CLICKit, the AI was not utilized merely for code completion; it functioned as a primary architectural partner. Developing a system-level macOS application required navigating complex, poorly-documented constraints—such as bypassing standard AppKit event loops to monitor global `CGEvent` keystrokes without activating the application, bridging asynchronous `AVAudioEngine` websocket streams with the main thread, and executing precise multi-monitor Bezier coordinate mapping.

By submitting to this track, we are sharing the comprehensive agent traces that document our collaborative problem-solving process. These traces reveal how the AI partner autonomously diagnosed undocumented TCC permission failures, re-architected the microphone state machine to prevent race conditions, and iteratively refined the spatial mathematics required for the "Magical Cursor" overlay. 

CLICKit stands as proof that when integrated as a true engineering partner, AI can help small teams architect and deploy profound, system-level innovations that redefine Human-Computer Interaction.

---

# YouTube Video Details

### Title Options
- CLICKit: The Native macOS AI Sidekick with Spatial Awareness
- Building a Zero-Friction AI Sidekick for macOS (Trace Commons)
- CLICKit Demo: Rethinking Human-Computer Interaction with Multimodal AI

### Description
Meet **CLICKit**, a zero-friction, native macOS AI sidekick built for the Trace Commons track. 

Unlike traditional screen-sharing AI tools that clutter your dock and steal your window focus, CLICKit operates entirely invisibly in your menu bar. By bridging multimodal AI reasoning (Gemini / Claude) with system-level spatial awareness, it doesn’t just tell you the answer—it physically guides your eyes with a magical, animated cursor.

In this demo, we showcase:
- **0:00** - The Problem with Intrusive AI Assistants
- **0:45** - How CLICKit Works (Zero-Friction `Ctrl + Option` Push-to-Talk)
- **1:30** - The "Magical Cursor" in Action (Multi-Monitor Spatial UI Annotation)
- **2:45** - Deep Dive into the Architecture (Swift, CoreGraphics, Python Proxy)
- **4:00** - AI as an Engineering Partner (Trace Commons submission details)

**Built for the Trace Commons AI Track:**
This entire application—from bypassing macOS AppKit event loops to resolving complex coordinate math—was architected and built in profound collaboration with an autonomous AI coding agent. We are open-sourcing our agent traces to demonstrate how AI can be elevated from a simple utility to a foundational software engineering partner.

🔗 **Devfolio Submission:** [Link to your project]
💻 **GitHub / Traces:** [Link to your repo]
🚀 **Try it out:** [Link to download]
