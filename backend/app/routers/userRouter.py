from fastapi import APIRouter, HTTPException, Depends
from app.models.Models import User, Cart, LoggedInUser
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
                        detail=f"Username {user.username} already exists or email {user.email} already used")
    else:
        await dbUser.create_user(user)
        raise HTTPException(status_code=201, detail=f"User {user.username} created")
    
   

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


#get user through token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, os.getenv('SECRET_KEY'),
                             os.getenv('ALGORITHM'))
        user = await dbUser.fetch_one_user(username=payload.get('sub'))
        return user
    except:
        raise HTTPException(status_code=400, detail="Bad request")


@router.get('/me', response_model=LoggedInUser)
async def get_logged_in_user(user: LoggedInUser = Depends(get_current_user)):
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



#get username through token
async def get_current_username(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, os.getenv('SECRET_KEY'),
                             os.getenv('ALGORITHM'))
        user = await dbUser.get_username(username=payload.get('sub'))
        return user
    except:
        raise HTTPException(status_code=400, detail="Bad request")




#Item routes start from here
@router.put('/addItem/')
async def add_item_to_cart(cart: Cart,
                           username: str = Depends(get_current_username)):
    response = await dbUser.add_cart(username, cart)
    if response:
        return response
    raise HTTPException(400, f'there is no user with the username {username}')


@router.delete('/removeItem/')
async def remove_item_from_cart(id: str,
                                username: str = Depends(get_current_username)):
    response = await dbUser.delete_from_cart(username, id)
    if response:
        return response
    raise HTTPException(404, f'there is no user with the username {username}')


@router.get('/listItems/{username}')
async def list_items_by_username(username):
    response = await dbUser.list_items(username)
    if response:
        return response
