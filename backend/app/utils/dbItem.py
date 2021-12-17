import os
from dotenv import load_dotenv
from fastapi import APIRouter, Body, Request, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models import ItemsModel
from passlib.context import CryptContext
from jose import jwt
import pymongo

import os
import motor.motor_asyncio

#loadenv
load_dotenv()

#Client object
# client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('DB_HOST'))
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://dbMaster:5e9C1QS42KSS4V2c@petshopcluster.2km87.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
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
    await collection.update_one({'_id': id}, {'$set': jsonable_encoder(item)})
    document = await collection.find_one({"_id": id})
    return document


async def list_pets():
    pets = []
    cursor = collection.find({'isPet': True})
    async for document in cursor:
        pets.append(ItemsModel.Item(**document))
    return pets


async def list_products():
    items = []
    cursor = collection.find({'isPet': False})
    async for document in cursor:
        items.append(ItemsModel.Item(**document))
    return items


async def fetch_one_product(id):
    try:
        document = await collection.find_one({"_id": id})
        return document
    except:
        raise HTTPException(400, "Product not found")


async def search(keyword, boolean):
    await collection.create_index([("name", pymongo.TEXT)])
    results = []
    # cursor = collection.find({"isPet": boolean, "$text": {"$search": keyword, "$diacriticSensitive": True} })
    cursor = collection.aggregate([
       { "$search": {
            "text" : {
                "path" : "name",
                "query": keyword,
                "fuzzy": {}
            }
        }
    }, { "$match" : { "isPet" : boolean } }])
    async for document in cursor:
        results.append(ItemsModel.Item(**document))
    return results

async def recommend(keyword, boolean, id):
    await collection.create_index([("name", pymongo.TEXT)])
    results = []
    # cursor = collection.find({"isPet": boolean, "$text": {"$search": keyword, "$diacriticSensitive": True} })
    recommend = collection.aggregate([
       { "$search": {
            "text" : {
                "path" : "name",
                "query": keyword,
                "fuzzy": {}
            }
        }
    }, { "$match" : { "isPet" : boolean , "_id": {"$not": {"$eq": id}}} },  { "$limit" : 3 }, 
    ])
    async for document in recommend:
        results.append(ItemsModel.Item(**document))
    return results