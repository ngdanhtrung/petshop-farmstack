import React, { useEffect, useState } from "react";
// Redux
import { connect } from "react-redux";
import Product from "./index";
import Icon from "../../component/Icon/icon2";
import axios from "axios";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import ProductDetails from "./ProductDetails/index";
import { FiSearch } from "react-icons/fi";
import {RiEmotionSadLine} from 'react-icons/ri';
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
    if (input == "") getItems();
    else {
      await axios
        .get(`${search}/${input}`)
        .then((res) => {
          setItems(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(getItems, []);
  useEffect(searchItem, [input]);

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <div className='containers-input-search'>
            <input
              className='input-search'
              value={input}
              onChange={onChangeHandler}
            ></input>
            <FiSearch className='icon-search'></FiSearch>
          </div>
          <Icon title='Các sản phẩm cho thú cưng của bạn' />
          <div className='row-products'>
            {items ? (
              items.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <div className="message-not-found">
                    <RiEmotionSadLine></RiEmotionSadLine>
                    <span> Rất tiếc, Không tìm thấy sản phẩm phù hợp với tìm kiếm của bạn!</span>
                  </div>
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
