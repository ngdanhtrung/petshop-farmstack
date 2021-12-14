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
        <Switch>
            <Route exact path={path}>
                <div>
                    <div className="row-products">
                        <div className="col-products">
                            <img alt = "a"src={product.img}></img>
                            <button className="" onClick={() => addCart(product.id)}>+</button>
                            <Link onClick={() => loadCurrentItem(product)}
                                    to={`${url}/${product.id}`}>
                                Xem chi tiết
                            </Link>
                            <h3>{product.name}</h3>
                            <div>{product.price}</div>
                        </div>
                    </div>
                </div>
            </Route>
            <Route path={`${path}/:id`}>
                <ProductDetails/>
            </Route>
        </Switch>
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
