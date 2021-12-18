import os
from dotenv import load_dotenv
from fastapi import APIRouter, Body, Request, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models import UsersModel
from passlib.context import CryptContext
from jose import jwt
import pymongo
import os
import motor.motor_asyncio

#loadenv
load_dotenv()

#password_context
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

#Client object
# client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('DB_HOST'))
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://dbMaster:5e9C1QS42KSS4V2c@petshopcluster.2km87.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
database = client[os.getenv('DB_NAME')]
collection = database.users

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='users/login')


async def fetch_one_user(username):
    document = await collection.find_one({"username": username})
    return document


async def fetch_all_users():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(UsersModel.FetchedUsers(**document))
    return users

async def count_users():
    return await collection.count_documents({})

async def count_users_in_month():
    results = []
    cursor = collection.aggregate([ 
        {"$project": {
            "month" : {"$month" : "$created_at"},
            "year" : {"$year" : "$created_at"},
        }},
        {"$group" : { 
            "_id" : {"month" : "$month", "year" : "$year"},  
            "count" : {"$sum": 1},
            # "month" : {"month" : "$month"},
            # "year" : {"year" : "$year"}
        }}])
    # cursor = collection.aggregate([
    # {"$group" : { 
    #     "_id" : { 
    #     "month" : {"$month" : "$created_at"}, 
    #     "year" : {"$year" :  "$created_at"}
    #     },  
    #     "count" : {"$sum" : 1} ,
        
    #     }}
    #     "month" : {"$month" : "$created_at"},
    #     "year" : {"$year" : "$created_at"}
    # ])
    async for document in cursor:
        results.append(UsersModel.UserCount(**document))
    return results

def encrypt_password(password):
    return pwd_context.hash(password)


async def create_user(user):
    try:
        user.pwd = encrypt_password(user.pwd)
        document = jsonable_encoder(user)
        await collection.insert_one(document)
        await collection.update_many({},[{ "$set": { "created_at": { "$toDate": "$created_at" } }}])
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

async def authenticate_admin(username, password):
    if await collection.count_documents({"username": username, "role" : "admin"}) == 1:
        doc = await collection.find_one({"username": username})
        p = doc['pwd']
        password_check = pwd_context.verify(password, p)
        # print(password_check)
        return password_check
    else:
        raise HTTPException(status_code=400, detail="Admin does not exist")



#get user through token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, os.getenv('SECRET_KEY'),
                             os.getenv('ALGORITHM'))
        user = await fetch_one_user(username=payload.get('sub'))
        return user
    except:
        raise HTTPException(status_code=400, detail="Bad request")


#get username through token
async def get_current_username(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, os.getenv('SECRET_KEY'),
                             os.getenv('ALGORITHM'))
        user = await get_username(username=payload.get('sub'))
        return user
    except:
        raise HTTPException(status_code=400, detail="Bad request")


async def get_username(username):
    document = await collection.find_one({"username": username})
    return document['username']


async def user_already_exist(user):
    if await collection.count_documents({
            "username": user.username
    }) or await collection.count_documents({"email": user.email}):
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


async def clear_cart(username):
    document = await collection.update_one({'username': username},
                                           {'$unset': {
                                               "cart": ""
                                           }})
    return document


async def get_cart_count(username):
    count = []
    cursor = collection.aggregate([{
        "$match": {
            "username": username
        }
    }, {
        "$project": {
            "count": {
                "$size": "$cart"
            }
        }
    }])
    async for document in cursor:
        count.append(UsersModel.Count(**document))
    return count
