from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request
from app.db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from app.services.entity_service import handle_handshake
from utils.limiter import limiter

router = APIRouter()


def get_visitor_id(request: Request) -> str:
    visitor_id = request.headers.get("x-visitor-id")
    if not visitor_id:
        raise HTTPException(status_code=400, detail="Missing header: X-Visitor-ID")
    return visitor_id

def get_entity_id(request: Request) -> Optional[UUID]:
    entity_id_str = request.headers.get("x-entity-id")
    if entity_id_str:
        try:
            return UUID(entity_id_str)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid X-Entity-ID header format")
    return None


@router.post("/handshake")
@limiter.limit("100/minute")
async def handshake(
    request: Request,
    device_info: dict,
    visitor_id: str = Depends(get_visitor_id),
    session: AsyncSession = Depends(get_session),
    
):
    return await handle_handshake(session, visitor_id, device_info)



