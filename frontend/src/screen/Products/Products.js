import React from "react";
// Redux
import { connect } from "react-redux";
import Product from "./index";
import Icon from "../../component/Icon/icon2"

const Products = ({ products }) => {
  return (
    <>
    <Icon title = "Các sản phẩm cho thú cưng của bạn"/>
    <div className="row-products">
      {products.map((product) => (
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
