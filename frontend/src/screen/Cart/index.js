import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import CartItem from './CartItem';
import './styles.css'

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
            <table className="table">
            <thead>
                    <tr>
                        <th className="table-name">Tên sản phẩm</th>
                        <th className="table-img">Ảnh</th>
                        <th className="table-price">Giá</th>
                        <th className="table-numbercount">Số lượng</th>
                        <th></th>
                    </tr>
                </thead>
                </table>
                {cart.map((value) =>(
                    <CartItem key={value.id} item={value}></CartItem>
                ))}
{/*                 
            <div>Số lượng: {totalItem}</div> */}
            <div className="row-sum">
                <div className="sum-count">Tổng trị giá: </div>
                <div className="sum-count-price">{totalPrice}</div>
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
