import React, { useEffect, useState } from "react";
import Icon from "../../component/Icon/icon2";
import "./styles.css";
import { connect } from "react-redux";
import { loadCurrentItem, addCart } from "../../redux/actions";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import ProductDetails from "./ProductDetails/index";
import axios from "axios";
const Product = ({ product, addCart, loadCurrentItem }) => {
  let { path, url } = useRouteMatch();
  const urlRequest = `${process.env.REACT_APP_API_KEY}items/addItem`;
  const addSingleItem = async (product) => {
    console.log(product);
    await axios
      .put(
        urlRequest,
        {
          id: product._id,
          name: product.name,
          image: product.image,
          quantity: 1,
          value: product.value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="col-products">
      <Link 
        onClick={() => loadCurrentItem(product)}
        to={`/Products/${product._id}`}
        className=' link-products'
      >
        <img alt='a' src={product.image}></img>
      </Link>
      <div className='type'>{product.extra.type}</div>
      <Link onClick={() => loadCurrentItem(product)}
        to={`/Products/${product._id}`} 
        className="name-product"><h3>{product.name}</h3></Link>
      <div class='price'>{product.value} đ</div>
      <button
        className='btn-add-to-cart'
        onClick={() => addSingleItem(product)}
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (id) => dispatch(addCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};
//Because we don't use mapStateToProps the first param must be null
export default connect(null, mapDispatchToProps)(Product);
