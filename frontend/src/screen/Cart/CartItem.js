import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { removeCart, adjQty } from "../../redux/actions";
import axios from "axios";

const CartItem = ({ item, getCart }) => {
  const [input, setInput] = useState(item.quantity);
  const urlRequest = `${process.env.REACT_APP_API_KEY}items/addItem`;
  const deleteReq = `${process.env.REACT_APP_API_KEY}items/removeItem`;
  const removeFromCart = async (id) => {
    await axios
      .delete(`${deleteReq}/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        getCart();
      });
  };
  const updateCart = async (qty) => {
    await axios
      .put(
        urlRequest,
        {
          id: item.id,
          name: item.name,
          image: item.image,
          quantity: qty,
          value: item.value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        getCart();
      });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    updateCart(e.target.value);
  };
  return (
    <div>
      <table className='table-cart'>
        <tr>
          <td className='title-table table-name'>{item.name}</td>
          <td className='table-img'>
            <img className='img-card' src={item.image}></img>
          </td>
          <td className='table-price'>{item.value}</td>
          <td className='table-numbercount'>
            <input
              min='1'
              max='20'
              type='number'
              id='qty'
              name='qty'
              value={input}
              onChange={onChangeHandler}
            />
          </td>
          <td>
            <button
              className='btn btn-deleted'
              onClick={() => removeFromCart(item.id)}
            >
              Xóa sản phẩm
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCart: (id) => dispatch(removeCart(id)),
    adjQty: (id, value) => dispatch(adjQty(id, value)),
  };
};

export default CartItem;
