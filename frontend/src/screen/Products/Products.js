import React, { useEffect, useState } from "react";
// Redux
import { connect } from "react-redux";
import Product from "./index";
import Icon from "../../component/Icon/icon2";
import axios from "axios";
const Products = ({ products }) => {
  const [items, setItems] = useState([]);
  const urlRequest = `${process.env.REACT_APP_API_KEY}products/getProducts`;
  const getItems = async () => {
    await axios
      .get(urlRequest)
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(getItems, []);
  return (
    <>
      <Icon title='Các sản phẩm cho thú cưng của bạn' />
      <div className='row-products'>
        {items.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state._todoProduct.products,
  };
};

export default connect(mapStateToProps)(Products);
