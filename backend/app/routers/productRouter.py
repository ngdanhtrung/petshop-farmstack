from fastapi import APIRouter, HTTPException
from app.models.ItemsModel import Item, EditItem
from app.utils import dbItem
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.post('/createProduct', response_model=Item)
async def create_new_product(item: Item):
    response = await dbItem.create_item(item)
    if response:
        return response

@router.put('/editProduct')
async def modify_product(id: str, item: EditItem):
    response = await dbItem.update_item(id, item)
    if response:
        return response

@router.delete('/removeProduct/')
async def delete_product(id: str):
    response = await dbItem.delete_item(id)
    if response:
        return {"detail": "Product successfully deleted"}