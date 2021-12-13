import os
from dotenv import load_dotenv
from fastapi import APIRouter, Body, Request, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models import UsersModel
from passlib.context import CryptContext
from jose import jwt

import os
import motor.motor_asyncio

#loadenv
load_dotenv()

#Client object
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('DB_HOST'))
database = client[os.getenv('DB_NAME')]
collection = database.items

async def create_item(item):
    try:
        item = jsonable_encoder(item)
        await collection.insert_one(item)
        return item
    except:
        raise HTTPException(400, 'Bad Request')

    

async def delete_item(id):
    result = await collection.delete_one({"_id": id})
    return result

async def update_item(id, item):
    await collection.update_one({'_id': id},
                                {'$set': jsonable_encoder(item)})
    document = await collection.find_one({"_id": id})
    return document