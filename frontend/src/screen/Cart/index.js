import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import CartItem from './CartItem'

const Cart = ({cart}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    useEffect(() => {
        let items = 0;
        let price = 0;
        cart.forEach((item) => {
          items += item.qty;
          price += item.qty * item.price;
        });
        setTotalPrice(price);
        setTotalItem(items);
      }, [cart, totalPrice, totalItem, setTotalPrice, setTotalItem]);
    return (
        <div>
            <div className="col-md-12">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tên sản phẩm</th>
                        <th>Ảnh</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền sản phẩm</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
                
            </table>
            {cart.map((value) =>(
                    <CartItem key={value.id} item={value}></CartItem>
                ))}
            <div>Tổng tiền: {totalItem}</div>
            <div>Giá: {totalPrice}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      cart: state._todoProduct.cart,
    };
  };
  
  export default connect(mapStateToProps)(Cart);
