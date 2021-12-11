import React from 'react'
import './styles.css'
import data from './data';
import Icon from '../../component/Icon/icon2';
import { FaPaw } from "react-icons/fa";
import {Link, Switch, Route} from "react-router-dom";
import Home from './../Home/index'
const Pets = () => {
    return (
        <div className="container-pets">
            <Icon title="Nhận nuôi thú cưng"/>
            <div className="row">
                {data.map((value) => (
                    <div className="menber">
                        <div >
                            <img className="img-pets" src={value.src}></img>
                        </div>
                        <div className="content">
                            <h4>{value.name}</h4>
                            <ul className="info-pet">
                                <li><FaPaw className="li-icon"/>Loại: {value.type}</li>
                                <li><FaPaw className="li-icon"/>Tuổi: {value.age}</li>
                                <li><FaPaw className="li-icon"/>Đặc điểm: {value.characteristic}</li>
                            </ul>
                        </div>
                        <nav className="btn-adopt"><Link className="adopt" to={value.to}>Nhận nuôi <FaPaw/></Link></nav>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pets;
