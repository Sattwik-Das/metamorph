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

@app.post("/api/chat")
async def handle_chat(request: Request):
    body = await request.body()
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY not configured")

    async def generate():
        async with httpx.AsyncClient() as client:
            req = client.build_request(
                "POST", 
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json"
                },
                content=body
            )
            response = await client.send(req, stream=True)
            async for chunk in response.aiter_bytes():
                yield chunk

    return StreamingResponse(generate(), media_type="text/event-stream")

@app.post("/api/tts")
async def handle_tts(request: Request):
    body = await request.body()
    voice_id = os.getenv("ELEVENLABS_VOICE_ID", "default_voice")
    api_key = os.getenv("ELEVENLABS_API_KEY")
    
    if not api_key:
        raise HTTPException(status_code=500, detail="ELEVENLABS_API_KEY not configured")

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
            headers={
                "xi-api-key": api_key,
                "content-type": "application/json",
                "accept": "audio/mpeg"
            },
            content=body
        )
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
        
    return Response(content=response.content, media_type="audio/mpeg")

@app.get("/api/transcribe-token")
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
