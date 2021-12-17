import React from "react";
// Redux
import { connect } from "react-redux";
import Product from "./index";
import Icon from "../../component/Icon/icon2"
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import ProductDetails from './ProductDetails/index'
const Products = ({ products }) => {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
        <Route exact path={path}>
          <>
    <Icon title = "Các sản phẩm cho thú cưng của bạn"/>
    <div className="row-products">
      {products.map((product) => (
        <Product key={product.id} product={product} />
        ))}
    </div>
    
    </>
        </Route>
        <Route path={`${path}/:id`}>
          <ProductDetails />
        </Route>
      </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state._todoProduct.products,
  };
};

export default connect(mapStateToProps)(Products);
