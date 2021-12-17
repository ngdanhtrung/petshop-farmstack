import React, { useEffect, useState } from "react";
// Redux
import { connect } from "react-redux";
import Product from "./index";
import Icon from "../../component/Icon/icon2";
import axios from "axios";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import ProductDetails from "./ProductDetails/index";
const Products = ({ products }) => {
  let { path, url } = useRouteMatch();
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const urlRequest = `${process.env.REACT_APP_API_KEY}products/getProducts`;
  const search = `${process.env.REACT_APP_API_KEY}products/searchItems`;

  const getItems = async () => {
    await axios
      .get(urlRequest)
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const searchItem = async () => {
    await axios
      .get(`${search}/${input}`)
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(getItems, [input]);
  useEffect(searchItem, [input]);

  return (
    <>
      <input value={input} onChange={onChangeHandler} />

      <Switch>
        <Route exact path={path}>
          <Icon title='Các sản phẩm cho thú cưng của bạn' />
          <div className='row-products'>
            {items ? (
              items.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <div>ko</div>
            )}
          </div>
        </Route>
        <Route path={`${path}/:id`}>
          <ProductDetails />
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state._todoProduct.products,
  };
};

export default connect(mapStateToProps)(Products);
