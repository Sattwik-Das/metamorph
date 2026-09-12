from sqlalchemy import Boolean, Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    avatar_url = Column(String)

class Integration(Base):
    __tablename__ = "integrations"

    id = Column(String, primary_key=True, index=True) # e.g., 'elevenlabs'
    name = Column(String)
    role = Column(String)
    api_key = Column(String, nullable=True) # The user's secret key
    is_active = Column(Boolean, default=False)
