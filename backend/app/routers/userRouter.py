from fastapi import APIRouter, HTTPException, Depends
from app.models.Models import User, Cart, Login
from app.db import dbUser
from datetime import timedelta, datetime
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='users/login')


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.getenv('SECRET_KEY'),
                             os.getenv('ALGORITHM'))
    # print(to_encode)
    return encoded_jwt


@router.post('/login', tags=["authentication"])
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    password = form_data.password
    # print(username, password)
    if await dbUser.authenticate_user(username, password):
        access_token = create_access_token(data={'sub': username},
                                           expires_delta=timedelta(minutes=30))
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=400, detail="Incorrect password")


@router.get('/token')
async def get_token(token: str = Depends(oauth2_scheme)):
    return {'the_token': token}


@router.get('/')
async def get_users():
    response = await dbUser.fetch_all_users()
    return response


@router.get('/{username}', response_model=User)
async def get_user_by_username(username):
    response = await dbUser.fetch_one_user(username)
    if response:
        return response
    raise HTTPException(404, f'there is no user with the username {username}')


@router.post("/", response_model=User)
async def create_new_user(todo: User):
    response = await dbUser.create_user(todo)
    if response:
        return response
    # raise HTTPException(status_code=405, detail=f"Username {todo.username} already exists")


@router.put('/addItem/')
async def add_item_to_cart(username: str, cart: Cart):
    response = await dbUser.add_cart(username, cart)
    if response:
        return response
    raise HTTPException(404, f'there is no user with the username {username}')


#Cart vẫn cần validation khi add vào, tránh add nhiều vật trùng vào cart


@router.delete('/removeItem/')
async def remove_item_from_cart(username: str, id: str):
    response = await dbUser.delete_from_cart(username, id)
    if response:
        return response
    raise HTTPException(404, f'there is no user with the username {username}')


@router.get('/listItems/{username}')
async def list_items_by_username(username):
    response = await dbUser.list_items(username)
    if response:
        return response
