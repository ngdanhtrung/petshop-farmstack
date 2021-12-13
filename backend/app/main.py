from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.userRouter import router as UserRoute
from app.routers.itemRouter import router as ItemRoute
from app.routers.productRouter import router as ProductRoute
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


@app.get('/')
async def read_root():
    return ({"ping": "pong!"})


app.include_router(UserRoute, tags=["users"], prefix="/users")
app.include_router(ItemRoute, tags=["items"], prefix="/items")
app.include_router(ProductRoute, tags=["products"], prefix='/products')