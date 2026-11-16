import asyncio

from fastapi import APIRouter, HTTPException
from google import genai
from google.genai import types

from app.config import GEMINI_API_KEY, GEMINI_LIVE_MODEL
from app.services.gemini import SYSTEM_PROMPT

router = APIRouter()


@router.post("/voice/token")
async def create_voice_token():
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="Clé Gemini non configurée"
        )

    try:
        client = genai.Client(
            api_key=GEMINI_API_KEY,
            http_options=types.HttpOptions(api_version="v1alpha"),
        )

        token = await asyncio.to_thread(
            client.auth_tokens.create,
            config={
                "uses": 1,
                "live_connect_constraints": {
                    "model": GEMINI_LIVE_MODEL,
                    "config": {
                        "response_modalities": ["AUDIO"],
                        "input_audio_transcription": {},
                        "output_audio_transcription": {},
                        "system_instruction": SYSTEM_PROMPT,
                        "session_resumption": {},
                    },
                },
            },
        )

        return {
            "token": token.name,
            "model": GEMINI_LIVE_MODEL,
        }

    except Exception as exc:
        print(f'GEMINI LIVE ERROR: {type(exc).__name__}: {exc}', flush=True)
        raise HTTPException(
            status_code=500,
            detail="Impossible de créer le jeton Gemini Live."
        )
