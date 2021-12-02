from fastapi import APIRouter, Body, Request, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from app.models.Models import User, Cart
from app.db import dbUser

router = APIRouter()

# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

# @router.post('/token')
# async def token(form_data: OAuth2PasswordRequestForm = Depends()):
#     return {'access_token': form_data.username + 'token'}

# @router.get('/index')
# async def index(token: str = Depends(oauth2_scheme)):
#     return {'the_token': token} mấy cái này mò chơi tạm thời đừng chú ý


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
