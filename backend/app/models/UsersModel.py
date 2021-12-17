from enum import unique
from typing import Optional
from datetime import datetime
import uuid
from email_validator import validate_email, EmailNotValidError
from pydantic import BaseModel, Field, ValidationError, validator, EmailStr


class LoggedInUser(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str = Field(..., max_length=16)


class Count(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    count: int


class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str = Field(..., max_length=16)
    fullname: Optional[str] = Field(None, max_length=32)
    email: str = EmailStr(...)
    pwd: str = Field(...)
    role: str = Field(default_factory=lambda: "user", max_length=16)
    created_at: datetime = Field(default_factory=datetime.now)

    @validator('username')
    def name_must_not_contain_space(cls, v):
        if ' ' in v:
            raise ValueError('Tên người dùng không được có khoảng trắng')
        return v

    @validator('username')
    def username_alphanumeric(cls, v):
        assert v.isalnum(), 'Tên người dùng chỉ được chứa chữ cái và số'
        return v

    @validator('email')
    def email_validator(cls, v):
        try:
            validate_email(v)
        except EmailNotValidError as e:
            raise ValueError(e)
        return v

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "username": "user",
                "fullname": "User Anderson",
                "email": "example@mail.com",
                "pwd": "password",
            }
        }