from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from uuid import uuid4
from app.database import connect
from app.services.gemini import get_client, SYSTEM_PROMPT
from app.config import GEMINI_CHAT_MODEL

router = APIRouter()

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    conversation_id: str | None = None

@router.post("/chat")
async def chat(body: ChatRequest):
    conversation_id = body.conversation_id or str(uuid4())

    try:
        with connect() as conn:
            history = conn.execute(
                "SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY id DESC LIMIT 12",
                (conversation_id,)
            ).fetchall()

        history = list(reversed(history))
        prompt = SYSTEM_PROMPT + "\n\nHistorique de la conversation :\n"
        for item in history:
            prompt += f"{item['role']}: {item['content']}\n"
        prompt += f"\nVisiteur: {body.message}\nAssistant:"

        client = get_client()
        response = await client.aio.models.generate_content(
            model=GEMINI_CHAT_MODEL,
            contents=prompt
        )
        answer = response.text or "Je n'ai pas pu générer de réponse."

        with connect() as conn:
            conn.execute(
                "INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)",
                (conversation_id, "user", body.message)
            )
            conn.execute(
                "INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)",
                (conversation_id, "assistant", answer)
            )

        return {"conversation_id": conversation_id, "reply": answer}

    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
