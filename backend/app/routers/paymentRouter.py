from fastapi import APIRouter, HTTPException, Depends
from app.models.UsersModel import User, LoggedInUser
from app.models.ItemsModel import Cart
from app.models.PaymentsModel import Payment, PetPayment
from app.utils import dbUser
from app.utils import dbPayment
from datetime import timedelta, datetime
from jose import jwt
import os
from dotenv import load_dotenv


load_dotenv()

router = APIRouter()

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='users/login')


@router.post('/addPayment/')
async def create_new_payment(payment: Payment,
                             username: str = Depends(
                                 dbUser.get_current_username)):
    response = await dbPayment.add_payment(username, payment)
    if response:
        return response


@router.post('/addPPet/')
async def create_new_pet_payment(payment: PetPayment,
                             username: str = Depends(
                                 dbUser.get_current_username)):
    response = await dbPayment.add_payment_pet(username, payment)
    if response:
        return response

@router.get('/findPayment/{id}')
async def get_payment(id):
    response = await dbPayment.get_payment_by_id(id)
    if response:
        return response

@router.get('/getPayments/')
async def get_payments():
    response = await dbPayment.fetch_all_payments()
    return response