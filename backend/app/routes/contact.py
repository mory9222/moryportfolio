from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from email.message import EmailMessage
import smtplib
import asyncio

from app.database import connect
from app.config import (
    SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD,
    EMAIL_FROM, EMAIL_TO
)

router = APIRouter()

class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=5, max_length=5000)

def send_email(data):
    if not all([SMTP_HOST, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM, EMAIL_TO]):
        return False

    email = EmailMessage()
    email["Subject"] = f"Portfolio - Nouveau message de {data.name}"
    email["From"] = EMAIL_FROM
    email["To"] = EMAIL_TO
    email["Reply-To"] = str(data.email)
    email.set_content(
        f"Nom : {data.name}\nEmail : {data.email}\n\n{data.message}"
    )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(email)
    return True

@router.post("/contact")
async def contact(body: ContactRequest):
    with connect() as conn:
        conn.execute(
            "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
            (body.name, str(body.email), body.message)
        )

    try:
        sent = await asyncio.to_thread(send_email, body)
    except Exception:
        sent = False

    return {
        "success": True,
        "saved": True,
        "email_sent": sent,
        "message": "Message enregistré."
    }
