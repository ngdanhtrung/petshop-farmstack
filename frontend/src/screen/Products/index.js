import React from 'react'
import Icon from '../../component/Icon/icon2'
import './styles.css'
import {connect} from 'react-redux';
import {loadCurrentItem,addCart} from '../../redux/actions'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import ProductDetails from './ProductDetails/index'

const Product = ({product, addCart, loadCurrentItem}) => {
    let { path, url } = useRouteMatch();
    return (
        
        <div  className="col-products link-products">
            <Link onClick={() => loadCurrentItem(product)}
                    to={`${url}/${product.id}`}
                    className="img-products"><img alt = "a"src={product.img}></img></Link>
            <div className="type">{product.type}</div>
            <Link onClick={() => loadCurrentItem(product)}
                    to={`${url}/${product.id}`}
                    className="name-products"><h3>{product.name}</h3></Link>
            <div class="price">{product.price} đ</div>
            <button className="btn-add-to-cart" onClick={() => addCart(product.id)}>Thêm vào giỏ hàng</button>
        </div>  
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
      addCart: (id) => dispatch(addCart(id)),
      loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
    };
  };
  //Because we don't use mapStateToProps the first param must be null
  export default connect(null, mapDispatchToProps)(Product);
