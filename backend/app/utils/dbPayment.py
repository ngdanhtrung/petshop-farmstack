import json
import os
from dotenv import load_dotenv
from fastapi import APIRouter, Body, Request, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models import UsersModel
from app.models import PaymentsModel
from app.utils import dbUser
from passlib.context import CryptContext
from jose import jwt
import os
import motor.motor_asyncio

from app.models.ItemsModel import Item

#loadenv
load_dotenv()

#Client object
# client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('DB_HOST'))
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://dbMaster:5e9C1QS42KSS4V2c@petshopcluster.2km87.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
database = client[os.getenv('DB_NAME')]
userTbl = database.users
paymentTbl = database.payments


async def add_payment(username, payment):
    try:
        user = await userTbl.find_one({"username": username}, {
            "username": 1,
            "cart": 1
        })
        cart = user["cart"]
        totalAmount = 0
        for item in cart:
            totalAmount += item["value"] * item["quantity"]
        user = jsonable_encoder(user)
        payment = jsonable_encoder(payment)
        insert = await paymentTbl.insert_one(payment)
        await paymentTbl.update_one({
            "_id": insert.inserted_id,
        }, {'$set': {
            "user": user,
            "amount": totalAmount
        }})
        await dbUser.clear_cart(username)
        await paymentTbl.update_many({},[{ "$set": { "created_at": { "$toDate": "$created_at" } }}])
        document = await paymentTbl.find_one({"_id": insert.inserted_id})
        return document
    except:
        raise HTTPException(400, f'something went wrong')

async def add_payment_pet(username, payment):
    try:
        user = await userTbl.find_one({"username": username}, {
            "username": 1,
        })
        user = jsonable_encoder(user)
        payment = jsonable_encoder(payment)
        insert = await paymentTbl.insert_one(payment)
        await paymentTbl.update_one({
            "_id": insert.inserted_id,
        }, {'$set': {
            "user": user,
        }})
        await paymentTbl.update_many({},[{ "$set": { "created_at": { "$toDate": "$created_at" } }}])
        document = await paymentTbl.find_one({"_id": insert.inserted_id})
        return document
    except:
        raise HTTPException(400, f'something went wrong')


async def get_payment_by_id(id):
    document = await paymentTbl.find_one({"_id": id})
    return document

async def count_payments():
    return await paymentTbl.count_documents({})

async def total_amount_by_month():
    results = []
    cursor = paymentTbl.aggregate([ 
        {"$project": {
            "month" : {"$month" : "$created_at"},
            "year" : {"$year" : "$created_at"},
            "total": {"$sum": "$amount"}
        }},
        {"$group" : { 
            "_id" : {"month" : "$month", "year" : "$year"},  
            "total" : {"$sum": "$total"}
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
        results.append(PaymentsModel.totalAmount(**document))
    return results