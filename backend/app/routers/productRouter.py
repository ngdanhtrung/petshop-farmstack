from fastapi import APIRouter, HTTPException
from starlette.responses import Response
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


@router.delete('/removeProduct')
async def delete_product(id: str):
    response = await dbItem.delete_item(id)
    if response:
        return {"detail": "Product successfully deleted"}


@router.get('/getPets')
async def get_pets():
    response = await dbItem.list_pets()
    if response:
        return response


@router.get('/getProducts')
async def get_products():
    response = await dbItem.list_products()
    if response:
        return response


@router.get('/getSingleProduct')
async def get_single_product(id: str):
    response = await dbItem.fetch_one_product(id)
    if response:
        return response
    raise HTTPException('404', 'Product Not Found')


@router.get('/searchItems')
async def search_for_items(keywords: str):
    isPet = False
    response = await dbItem.search(keywords, isPet)
    if response:
        return response


@router.get('/searchPets')
async def search_for_pets(keywords: str):
    isPet = True
    response = await dbItem.search(keywords, isPet)
    if response:
        return response