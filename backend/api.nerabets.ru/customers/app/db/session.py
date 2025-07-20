from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator
from app.core.config import settings
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

# Движок
engine = create_async_engine(settings.db_url, echo=False)

# Фабрика сессий
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Зависимость для FastAPI
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
