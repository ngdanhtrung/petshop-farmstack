import os
from dotenv import load_dotenv
from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from app.models import Models
from passlib.context import CryptContext
import os
import motor.motor_asyncio

#loadenv
load_dotenv()

#password_context
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

#Client object
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('DB_HOST'))
database = client[os.getenv('DB_NAME')]
collection = database.users


async def fetch_one_user(username):
    document = await collection.find_one({"username": username})
    return document


async def fetch_all_users():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(Models.User(**document))
    return users


def encrypt_password(password):
    return pwd_context.hash(password)


async def create_user(user):
    try:
        user.pwd = encrypt_password(user.pwd)
        document = jsonable_encoder(user)
        await collection.insert_one(document)
        return document
    except:
        raise HTTPException(status_code=400,
                            detail=f"Username {user.username} already exists")



async def authenticate_user(username, password):
    if await collection.count_documents({"username": username}) == 1:
        doc = await collection.find_one({"username": username})
        p = doc['pwd']
        password_check = pwd_context.verify(password, p)
        # print(password_check)
        return password_check
    else:
        raise HTTPException(status_code=400, detail="Username does not exist")


async def get_username(username):
    document = await collection.find_one({"username": username})
    return document['username']

async def user_already_exist(user):
    if await collection.count_documents({"username": user.username}) or await collection.count_documents({"email": user.email}):
        return True
    else:
        return False

#Item fuct start from here
async def add_cart(username, cart):

    if await collection.count_documents({
            "username": username,
            "cart.id": cart.id
    }) != 0:
        #do something
        await collection.update_one({
            "username": username,
            "cart.id": cart.id
        }, {'$set': {
            "cart.$.quantity": cart.quantity
        }})
        document = await collection.find_one({"username": username})
    else:
        cart = jsonable_encoder(cart)
        await collection.update_one({'username': username},
                                    {'$addToSet': {
                                        "cart": cart
                                    }})
        document = await collection.find_one({"username": username})
    return document


async def delete_from_cart(username, id):

    await collection.update_one({'username': username},
                                {'$pull': {
                                    "cart": {
                                        "id": id
                                    }
                                }})
    document = await collection.find_one({"username": username})
    return document


async def list_items(username):
    document = await collection.find_one({'username': username}, {'cart': 1})
    return document