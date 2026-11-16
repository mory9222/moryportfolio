from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import FRONTEND_ORIGIN
from app.database import init_db
from app.routes import health, chat, voice, contact

app = FastAPI(title="Mory Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_ORIGIN,
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

app.include_router(health.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(voice.router, prefix="/api")
app.include_router(contact.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Mory Portfolio API is running"}
