from enum import unique
from typing import Optional
from datetime import datetime
import uuid
from pydantic import BaseModel, Field, ValidationError, validator, EmailStr


class Item(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str
    isPet: bool = False
    value: int

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "10110203-0405-0607-0809-0a0b0c0d0e0f",
                "name":
                "Con Cu Giả Đa Năng Thượng Hạng Luxury Rung Cực Sướng Phê Lòi Lồn",
                "isPet": False,
                "value": 122000,
            }
        }

class Cart(BaseModel):
    id: str = Field(...)
    quantity: int = 1

