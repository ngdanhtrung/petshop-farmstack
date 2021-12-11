from enum import unique
from typing import Optional
from datetime import datetime
import uuid
from email_validator import validate_email, EmailNotValidError
from pydantic import BaseModel, Field, ValidationError, validator, EmailStr



class LoggedInUser(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str = Field(..., max_length=16)


class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str = Field(..., max_length=16)
    email: str = EmailStr(...)
    pwd: str = Field(...)
    created_at: str = Field(default_factory=datetime.utcnow)

    @validator('username')
    def name_must_not_contain_space(cls, v):
        if ' ' in v:
            raise ValueError('must not contain spaces')
        return v

    @validator('username')
    def username_alphanumeric(cls, v):
        assert v.isalnum(), 'must be alphanumeric'
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
                "email": "example@mail.com",
                "pwd": "password",
            }
        }