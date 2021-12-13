import React from 'react'
import data from './data'
import Icon from '../../component/Icon/icon2'
import './styles.css'
const Products = () => {
    return (
        <div>
            <Icon title = "Các sản phẩm cho thú cưng của bạn"/>
            <div className="row-products">
                {data.map((value) => (
                    <div className="col-products">
                        <img src={value.img}></img>
                        <button className="">+</button>
                        <h3>{value.name}</h3>
                        <div>{value.money}</div>
                    </div>
                ) )}
                
            </div>
        </div>
    )
}

export default Products;
