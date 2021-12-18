import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import "./styles.css";
import axios from "axios";
import {Link} from 'react-router-dom'
const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [cart1, setCart] = useState([]);

  const urlRequest = `${process.env.REACT_APP_API_KEY}items/listItems`;

  const getCart = async () => {
    await axios
      .get(urlRequest, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setCart(res.data.cart);
        console.log(res.data.cart);
      });
  };
  useEffect(() => {
    if (cart1) {
      let items = 0;
      let price = 0;
      cart1.forEach((item) => {
        items += item.quantity;
        price += item.quantity * item.value;
      });
      setTotalPrice(price);
      setTotalItem(items);
    }
  }, [cart1]);

  useEffect(getCart, []);

  return (
    <>
      <div className="containers-row-cart">
        <div style={{textAlign: "center", marginRight: "20px"}}>
        <table className='table-cart'>
          <thead>
            <tr>
              <th className='table-name'>Tên sản phẩm</th>
              <th className='table-img'>Ảnh</th>
              <th className='table-price'>Giá</th>
              <th className='table-numbercount'>Số lượng</th>
              <th></th>
            </tr>
          </thead>
        </table>
        {cart1 &&
          cart1.map((value) => (
            <CartItem key={value.id} item={value} getCart={getCart}></CartItem>
          ))}
        {/*                 
            <div>Số lượng: {totalItem}</div> */}
            <hr></hr>
            
        </div>
            <div className="cart_totals">
              <url>
                <li> Tổng trị giá:
                  <span className='sum-count-price'>{totalPrice} đ</span>
                </li>
                <li> Phí vận chuyển:
                  <span className='sum-count-price'>Free ship</span>
                </li>
                <hr></hr>
                <li className='li-total' style={{fontWeight:900}}> Tổng tiền:
                  <span className='sum-count-price'>{totalPrice} đ</span>
                </li>
              </url>
              <Link to='/PaymentCart' className='btn-order'>Mua ngay</Link>
        </div>

      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state._todoProduct.cart,
  };
};

export default connect(mapStateToProps)(Cart);
