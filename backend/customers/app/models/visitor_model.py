from app.db.base import Base

from sqlalchemy import Column, String, JSON, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Visitor(Base):
    __tablename__ = "visitors"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True)
    visitor_id = Column(String)
    entity_id = Column(UUID, ForeignKey('entitys.id', ondelete='CASCADE'))
    device_info = Column(JSON)