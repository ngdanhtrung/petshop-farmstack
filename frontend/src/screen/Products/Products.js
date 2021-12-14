import React from "react";
// Redux
import { connect } from "react-redux";
import Product from "./index";

const Products = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state._todoProduct.products,
  };
};

export default connect(mapStateToProps)(Products);
