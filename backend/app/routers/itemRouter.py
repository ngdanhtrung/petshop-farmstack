from fastapi import APIRouter, HTTPException, Depends
from app.models.ItemsModel import Cart
from app.utils import dbUser
from datetime import timedelta, datetime
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='users/login')


#Item routes start from here
@router.put('/addItem/')
async def add_item_to_cart(cart: Cart,
                           username: str = Depends(
                               dbUser.get_current_username)):
    response = await dbUser.add_cart(username, cart)
    if response:
        return response
    raise HTTPException(400, f'there is no user with the username {username}')


@router.delete('/removeItem/{id}')
async def remove_item_from_cart(id,
                                username: str = Depends(
                                    dbUser.get_current_username)):
    response = await dbUser.delete_from_cart(username, id)
    if response:
        return response
    raise HTTPException(404, f'there is no user with the username {username}')


@router.get('/listItems/')
async def list_items_by_username(username: str = Depends(
    dbUser.get_current_username)):
    response = await dbUser.list_items(username)
    if response:
        return response


@router.delete('/clearItems/')
async def clear_users_cart(username: str = Depends(
    dbUser.get_current_username)):
    response = await dbUser.clear_cart(username)
    if response:
        return response


@router.get('/cartCount')
async def get_cart_count(username: str = Depends(dbUser.get_current_username)):
    response = await dbUser.get_cart_count(username)
    if response:
        return response