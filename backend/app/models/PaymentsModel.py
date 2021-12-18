from enum import unique
from typing import Optional
from datetime import datetime
import uuid
from pydantic import BaseModel, Field, ValidationError, validator, EmailStr


class Payment(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    address: str = Field(...)
    number: int
    email: str = "Default"
    extra: Optional[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        # schema_extra = {"example": {"created_at": datetime.utcnow}}


class PetPayment(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    address: str = Field(...)
    number: int
    email: str = "Default"
    extra: Optional[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    petID: str
    petName: str
    amount: int

    class Config:
        allow_population_by_field_name = True
        # schema_extra = {"example": {"created_at": datetime.utcnow}}
