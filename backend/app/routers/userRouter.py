from fastapi import APIRouter, HTTPException, Depends
from app.models.UsersModel import User, LoggedInUser
from app.utils import dbUser
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


@router.post('/register', response_model=User)
async def create_new_user(user: User):
    if await dbUser.user_already_exist(user):
        raise HTTPException(status_code=400,
                        detail=f"Tài khoản {user.username} đã tồn tại hoặc {user.email} đã được sử dụng")
    else:
        await dbUser.create_user(user)
        raise HTTPException(status_code=201, detail=f"Tài khoản {user.username} đã được tạo")
    
   

@router.post('/login')
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

@router.get('/me', response_model=LoggedInUser)
async def get_logged_in_user(user: LoggedInUser = Depends(dbUser.get_current_user)):
    return user


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



