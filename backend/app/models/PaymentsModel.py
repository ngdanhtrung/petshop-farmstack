from enum import unique
from typing import Optional
from datetime import datetime
import uuid
from pydantic import BaseModel, Field, ValidationError, validator, EmailStr

class Payment(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str
    phone: str
    address: str
    ammount: str