
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


from app.core.config import settings
from app.api.v1.entity_route import router as entity_route
from utils import limiter

app = FastAPI(
    title=settings.app_name
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем все домены
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP-методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

app.include_router(entity_route)


app.state.limiter = limiter

# Для разработки с hot-reload
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["app"],
        log_level="debug"
    )