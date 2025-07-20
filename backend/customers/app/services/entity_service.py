from typing import Optional
from app.models.visitor_model import Visitor
from app.models.entity_model import Entity
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from uuid import UUID

async def handle_handshake(
        session: AsyncSession, 
        visitor_id: str, 
        device_info: dict,
        entity_id: Optional[UUID] = None,):
    
    if entity_id:
        stmt = select(Entity).where(Entity.id == entity_id)
        result = await session.execute(stmt)
        existing_entity = result.scalar_one_or_none()
        if not existing_entity:
            # Если не нашли, создаём новый Entity с этим id (редкий кейс, или можно ошибку)
            new_entity = Entity(id=entity_id)
            session.add(new_entity)
            await session.flush()
        used_entity_id = entity_id
    else:
        # Если entity_id НЕ пришёл — ищем visitor_id
        stmt = select(Visitor).where(Visitor.visitor_id == visitor_id)
        result = await session.execute(stmt)
        existing_visitor = result.scalar_one_or_none()

        if existing_visitor:
            used_entity_id = existing_visitor.entity_id
        else:
            new_entity = Entity(id=uuid4())
            session.add(new_entity)
            await session.flush()
            used_entity_id = new_entity.id

    # Создаём новый Visitor с нужным entity_id
            new_visitor = Visitor(
                visitor_id=visitor_id,
                entity_id=used_entity_id,
                device_info=device_info,
            )
            session.add(new_visitor)
            await session.commit()

    return {"entity_id": str(used_entity_id)}
