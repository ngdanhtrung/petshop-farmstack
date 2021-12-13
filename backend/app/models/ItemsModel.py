from enum import unique
from typing import Optional
from datetime import datetime
import uuid
from pydantic import BaseModel, create_model, Field, ValidationError, validator, EmailStr


class Item(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str
    isPet: bool = False
    value: int = 0
    description: str = None
    extra={}
    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "1",
                "name":
                "Con Cu Giả Đa Năng Thượng Hạng Luxury Rung Cực Sướng Phê Lòi Lồn",
                "isPet": False,
                "value": 122000,
                "description": "",
                "extra": {"foo": "bar", "hotel?":"trivago"}
            }
        }

class EditItem(BaseModel):
    name: str
    isPet: bool = False
    value: int = 0
    description: str = None
    extra={}
    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name":
                "Con Cu Giả Đa Năng Thượng Hạng Luxury Rung Cực Sướng Phê Lòi Lồn",
                "isPet": False,
                "value": 122000,
                "description": "",
                "extra": {
                    "Summons": "Heard",
                    "Time": "Fleeting",
                    "Might": "Cannot be matched",
                    "Frozen Throne": "Served",
                    "Living and the dead": "Consumed",
                    "Oblivion": "Awaits"
                }
            }
        }

class Cart(BaseModel):
    id: str = Field(...)
    quantity: int = 1

