from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "nerabets.ru api"
    db_url: str = "postgresql+asyncpg://admin:secret@postgres:5432/mydb"


settings = Settings()