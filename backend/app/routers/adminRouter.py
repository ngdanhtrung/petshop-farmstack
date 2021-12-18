from fastapi import APIRouter, HTTPException
from starlette.responses import Response
from app.utils import dbUser, dbItem, dbPayment
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.get('/count/')
async def count():
  users = await dbUser.count_users()
  pets = await dbItem.count_pets()
  items = await dbItem.count_items()
  payments = await dbPayment.count_payments()
  return {"users": users, "pets": pets, "items": items, "payments": payments}

@router.get('/countUsers/')
async def count_users():
  response = await dbUser.count_users_in_month()
  if response:
    return response

@router.get('/totalAmountMonth/')
async def total_amount_by_month():
  response = await dbPayment.total_amount_by_month()
  if response:
    return response