import uuid
from pydantic import BaseModel, Field, ValidationError, validator, EmailStr


class Item(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str
    image: str = None
    isPet: bool = False
    value: int = 0
    description: str = None
    extra = {}

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "Thức ăn cho mèo",
                "image": "http://an.image",
                "isPet": False,
                "value": 122000,
                "description": "",
                "extra": {
                    "foo": "bar",
                    "hotel?": "trivago"
                }
            }
        }


class EditItem(BaseModel):
    name: str
    image: str = None
    isPet: bool = False
    value: int = 0
    description: str = None
    extra = {}

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "Thức ăn cho chó",
                "image": "http://an.image",
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
    value: int = 1000
