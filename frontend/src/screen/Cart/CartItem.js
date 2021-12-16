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
            <table className="table">
                <tr>
                    <td className="title-table table-name">{item.name}</td>
                    <td className="table-img"><img className="img-card"  src={item.img}></img></td>
                    <td className="table-price">{item.price}</td>
                    <td className="table-numbercount">
                      <input min='1'
                            type='number'
                            id='qty'
                            name='qty'
                            value={input}
                            onChange={onChangeHandler}/>
                    </td>
                    <td><button className="btn btn-deleted"onClick={() => removeCart(item.id)}>Xóa sản phẩm</button></td>
                </tr>
            </table>
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
