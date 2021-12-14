export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADJUST_QTY = "ADJUST_QTY";
export const LOAD_CURR_ITEM = "LOAD_CURR_ITEM";

export const addCart = (itemID) => {
    return {
      type: ADD_TO_CART,
      payload: {
        id: itemID,
      },
    };
  };
  
  export const removeCart = (itemID) => {
    return {
      type: REMOVE_FROM_CART,
      payload: {
        id: itemID,
      },
    };
  };
  
  export const adjQty = (itemID, value) => {
    return {
      type: ADJUST_QTY,
      payload: {
        id: itemID,
        qty: value,
      },
    };
  };
  
  export const loadCurrentItem = (item) => {
    return {
      type: LOAD_CURR_ITEM,
      payload: item,
    };
  };
  