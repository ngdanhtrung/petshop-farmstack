from enum import unique
from typing import Optional
from datetime import datetime
import uuid
from pydantic import BaseModel, Field, ValidationError, validator


class Cart(BaseModel):
    id: str = Field(...)
    quantity: int = 1


class Login(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str = Field(..., max_length=16)
    pwd: str = Field(...)
    created_at: str = Field(default_factory=datetime.utcnow)

    @validator('username')
    def name_must_not_contain_space(cls, v):
        if ' ' in v:
            raise ValueError('must not contain spaces')
        return v.title()

    @validator('username')
    def username_alphanumeric(cls, v):
        assert v.isalnum(), 'must be alphanumeric'
        return v

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "username": "1",
                "pwd": "1",
            }
        }


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


class Payment(BaseModel):
    id: str
    username: str
    phone: str
    address: str
    ammount: str