from sqlalchemy import Column, String, JSON, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.db.base import Base

class Entity(Base):
    __tablename__ = "entitys"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)