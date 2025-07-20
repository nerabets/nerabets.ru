import asyncio
from logging.config import fileConfig
from typing import Callable

from alembic import context
from sqlalchemy import Connection
from sqlalchemy.ext.asyncio import AsyncEngine

from app.models.entity_model import *
from app.models.visitor_model import *


from app.core.config import settings
from app.db.base import Base
from app.db.session import engine

config = context.config

TABLE_CREATION_ORDER = [
    'users',
    'utm_campaigns',
    'visitors',
    'utm_joins'
]

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

config.set_main_option('sqlalchemy.url', settings.db_url)
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    context.configure(
        url=settings.db_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def do_run_migrations(connection: Connection) -> None:
    """Синхронная функция-адаптер для Alembic."""
    context.configure(
        connection=connection,
        target_metadata=target_metadata
    )
    with context.begin_transaction():
        context.run_migrations()

async def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    async with engine.connect() as connection:
        # Явно указываем тип для callback-функции
        callback: Callable[[Connection], None] = do_run_migrations
        await connection.run_sync(callback)

if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())