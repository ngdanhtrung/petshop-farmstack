import { combineReducers } from 'redux';
import {ADD_TO_CART,REMOVE_FROM_CART,ADJUST_QTY,LOAD_CURR_ITEM} from  '../actions';
import data from '../../screen/Products/data'

const initProduct = {
    currentItem: null,
    cart:[],
    products:data
}

const todoProduct = (state = initProduct, action) => {
    switch (action.type) {
        case ADD_TO_CART:
          // Create Item data from products array
          const item = state.products.find(
            (product) => product.id === action.payload.id
          );
          // Check if Item is in cart already
          const inCart = state.cart.find((item) =>
            item.id === action.payload.id ? true : false
          );
    
          return {
            ...state,
            cart: inCart
              ? state.cart.map((item) =>
                  item.id === action.payload.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
                )
              : [...state.cart, { ...item, qty: 1 }],
          };
        case REMOVE_FROM_CART:
          return {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload.id),
          };
        case ADJUST_QTY:
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: +action.payload.qty }
                : item
            ),
          };
        case LOAD_CURR_ITEM:
          return {
            ...state,
            currentItem: action.payload,
          };
        default:
          return state;
      }
    
}

const ShopApp = combineReducers({
    _todoProduct:todoProduct
});
export default ShopApp;
