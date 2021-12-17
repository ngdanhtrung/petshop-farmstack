from fastapi import APIRouter, HTTPException
from starlette.responses import Response
from app.utils import dbUser, dbItem
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.get('/count/')
async def count():
  users = await dbUser.count_users()
  pets = await dbItem.count_pets()
  items = await dbItem.count_items()  
  return {"users": users, "pets": pets, "items": items}