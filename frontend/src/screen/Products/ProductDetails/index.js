import React from 'react'
import { addCart } from '../../../redux/actions'
import { connect } from "react-redux";
import './styles.css'

const ProductDetails = ({current, addCart}) => {
    return (
        <div className="product-details">
           <img alt="img" src={current.img}></img>
           <div className="content-product-details">
            <div>{current.name}</div> 
            <div>{current.price}</div>
            <button
          onClick={() => addCart(current.id)}
        >
          +
        </button>
           </div>
           
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      current: state._todoProduct.currentItem,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addCart: (id) => dispatch(addCart(id)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
