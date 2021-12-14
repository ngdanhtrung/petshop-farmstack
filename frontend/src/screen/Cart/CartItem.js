import React, { useState } from 'react'
import { connect } from "react-redux";
import { removeCart, adjQty } from '../../redux/actions'

const CartItem = ( {item, removeCart, adjQty} ) => {
    const [input, setInput] = useState(item.qty);
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjQty(item.id, e.target.value);
  };
    return (
        <div>
            <div>
                <img alt="img" src={item.img}></img>
                <div>{item.name}</div>
                <input
            min='1'
            type='number'
            id='qty'
            name='qty'
            value={input}
            onChange={onChangeHandler}
          />
            </div> 
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      removeCart: (id) => dispatch(removeCart(id)),
      adjQty: (id, value) => dispatch(adjQty(id, value)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(CartItem);
