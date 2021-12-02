from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from app.routers.userRouter import router as UserRoute
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [os.getenv('REACT_CLIENT')] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserRoute, tags=["users"], prefix="/users")