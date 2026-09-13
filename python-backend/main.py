import os
from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import httpx

import models
from database import engine, get_db

# Create DB tables
models.Base.metadata.create_all(bind=engine)

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup initial mock data if empty
    db = next(get_db())
    if not db.query(models.User).first():
        db.add(models.User(username="admin", full_name="Clickit Admin", avatar_url="https://i.pravatar.cc/150?u=a042581f4e29026024d"))
        db.commit()
    
    if not db.query(models.Integration).first():
        initial_integrations = [
            models.Integration(id="elevenlabs", name="ElevenLabs API", role="Voice Synthesis & TTS", is_active=True),
            models.Integration(id="swift", name="Swift App", role="macOS Native Integration", is_active=True),
            models.Integration(id="gemini", name="Gemini API", role="Multimodal AI Reasoning", is_active=True),
            models.Integration(id="sarvam", name="Sarvam API", role="Indic Voice AI", is_active=True),
            models.Integration(id="google", name="Google API", role="Voice Speech & Understanding", is_active=True)
        ]
        db.add_all(initial_integrations)
        db.commit()
    yield

app = FastAPI(title="Clickit Backend API", lifespan=lifespan)

# Allow CORS for the dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dashboard Data Routes ---

@app.get("/api/user/profile")
def get_profile(db: Session = Depends(get_db)):
    user = db.query(models.User).first()
    return {"username": user.username, "fullName": user.full_name, "avatarUrl": user.avatar_url}

@app.get("/api/integrations")
def get_integrations(db: Session = Depends(get_db)):
    ints = db.query(models.Integration).all()
    # We shouldn't return the raw API keys to the frontend for security, but for demonstration we will
    return [{"id": i.id, "name": i.name, "role": i.role, "isActive": i.is_active, "mockKey": i.api_key or f"sk-{i.id[:3]}-...-test"} for i in ints]

# --- Proxy AI Routes ---

import json
import base64
from google import genai
from google.genai import types

@app.post("/api/chat")
async def handle_chat(request: Request):
    body_bytes = await request.body()
    try:
        body = json.loads(body_bytes)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured")

    # Parse Anthropic-formatted request into Gemini format
    system_prompt = body.get("system", "")
    config = types.GenerateContentConfig(
        system_instruction=system_prompt,
        max_output_tokens=body.get("max_tokens", 1024),
        temperature=0.7,
    )

    contents = []
    messages = body.get("messages", [])
    for msg in messages:
        role = "user" if msg.get("role") == "user" else "model"
        content_data = msg.get("content", [])
        
        parts = []
        if isinstance(content_data, str):
            parts.append(types.Part.from_text(text=content_data))
        elif isinstance(content_data, list):
            for block in content_data:
                if block.get("type") == "text":
                    parts.append(types.Part.from_text(text=block.get("text", "")))
                elif block.get("type") == "image":
                    source = block.get("source", {})
                    b64_data = source.get("data", "")
                    mime_type = source.get("media_type", "image/jpeg")
                    try:
                        decoded_bytes = base64.b64decode(b64_data)
                        parts.append(types.Part.from_bytes(data=decoded_bytes, mime_type=mime_type))
                    except Exception as e:
                        print(f"Error decoding image: {e}")
                        
        if parts:
            contents.append(types.Content(role=role, parts=parts))

    print(f"DEBUG GEMINI PROMPT: {contents}")

    async def generate():
        try:
            client = genai.Client(api_key=api_key)
            response_stream = client.aio.models.generate_content_stream(
                model="gemini-3.6-flash",
                contents=contents,
                config=config
            )
            
            async for chunk in response_stream:
                if chunk.text:
                    event_data = {
                        "type": "content_block_delta",
                        "delta": {
                            "type": "text_delta",
                            "text": chunk.text
                        }
                    }
                    yield f"data: {json.dumps(event_data)}\n\n"
            
            yield "data: [DONE]\n\n"
        except Exception as e:
            error_msg = str(e)
            print(f"DEBUG GEMINI ERROR: {error_msg}")
            if api_key in error_msg:
                error_msg = "API Key Error"
            event_data = {
                "type": "error",
                "error": {
                    "type": "api_error",
                    "message": f"Gemini API Error: {error_msg}"
                }
            }
            yield f"data: {json.dumps(event_data)}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

@app.post("/api/tts")
async def handle_tts(request: Request):
    body = await request.body()
    voice_id = os.getenv("ELEVENLABS_VOICE_ID", "default_voice")
    api_key = os.getenv("ELEVENLABS_API_KEY")
    
    if not api_key:
        raise HTTPException(status_code=500, detail="ELEVENLABS_API_KEY not configured")

    client = httpx.AsyncClient()
    req = client.build_request(
        "POST",
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
        headers={
            "xi-api-key": api_key,
            "content-type": "application/json",
            "accept": "audio/mpeg"
        },
        content=body
    )
    
    response = await client.send(req, stream=True)
    
    if response.status_code != 200:
        await response.aread()
        error_msg = response.text
        await client.aclose()
        raise HTTPException(status_code=response.status_code, detail=error_msg)
        
    async def stream_audio():
        async for chunk in response.aiter_bytes():
            yield chunk
        await client.aclose()

    return StreamingResponse(stream_audio(), media_type="audio/mpeg")

@app.post("/api/transcribe-token")
async def handle_transcribe_token():
    api_key = os.getenv("ASSEMBLYAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="ASSEMBLYAI_API_KEY not configured")

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://streaming.assemblyai.com/v3/token?expires_in_seconds=480",
            headers={"authorization": api_key}
        )
        
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
        
    return response.json()

@app.post("/api/hey-clicky/intent")
async def handle_hey_clicky_intent(request: Request):
    """
    Hey Clickit intent resolver.
    Accepts { "command": "<raw transcript>" } and returns a structured
    Clickit action using the existing Gemini client.
    The API key never leaves the server.
    """
    body_bytes = await request.body()
    try:
        body = json.loads(body_bytes)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    command = body.get("command", "").strip()
    if not command:
        raise HTTPException(status_code=400, detail="Missing 'command' field")

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured")

    system_instruction = """\
You are Clickit's voice command interpreter for a macOS menu bar companion app.

The user spoke a voice command after saying "Hey Clickit". Your job is to map
their intent to one of the following allowed actions. Never invent new actions.

ALLOWED ACTIONS (return exactly one):
- show_panel          : Show the Clickit panel / open the menu bar app
- hide_panel          : Hide/dismiss the Clickit panel
- toggle_cursor       : Toggle the Clickit cursor overlay on/off
- respond             : Answer a general question conversationally (no UI action)
- clarify             : Ask for clarification when the command is too vague

Return ONLY a JSON object in this exact format — no markdown, no explanation:
{
  "action": "<action_name>",
  "parameters": {},
  "speech": "<concise spoken response, 1-10 words max>"
}

Examples:
  Command: "show me the panel" → {"action":"show_panel","parameters":{},"speech":"Opening panel."}
  Command: "hide that" → {"action":"hide_panel","parameters":{},"speech":"Closing."}
  Command: "turn off the cursor" → {"action":"toggle_cursor","parameters":{},"speech":"Cursor off."}
  Command: "what time is it" → {"action":"respond","parameters":{},"speech":"I don't have clock access, check the menu bar."}
  Command: "blorp schnack" → {"action":"clarify","parameters":{},"speech":"Can you say that again?"}

The speech field is what Clickit will say aloud. Keep it short and natural.\
"""

    try:
        client = genai.Client(api_key=api_key)
        response = await client.aio.models.generate_content(
            model="gemini-3.6-flash",
            contents=[types.Content(role="user", parts=[types.Part.from_text(text=command)])],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                max_output_tokens=256,
                temperature=0.2,
                response_mime_type="application/json",
            )
        )
        raw_text = response.text.strip() if response.text else "{}"
        # Strip markdown code fences if Gemini wraps the JSON
        if raw_text.startswith("```"):
            raw_text = raw_text.split("\n", 1)[-1].rsplit("```", 1)[0].strip()
        try:
            parsed = json.loads(raw_text)
        except json.JSONDecodeError:
            parsed = {"action": "clarify", "parameters": {}, "speech": "Sorry, I didn't catch that."}

        # Validate against allowlisted actions
        allowed_actions = {"show_panel", "hide_panel", "toggle_cursor", "respond", "clarify"}
        if parsed.get("action") not in allowed_actions:
            parsed = {"action": "clarify", "parameters": {}, "speech": "I'm not sure how to do that yet."}

        return parsed
    except Exception as e:
        error_msg = str(e)
        # Never leak the key in error messages
        if api_key and api_key in error_msg:
            error_msg = "API Key Error"
        raise HTTPException(status_code=500, detail=f"Gemini error: {error_msg}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
