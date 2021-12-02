import React from "react";
import './index.css';
import { Link, NavLink, Switch, Route } from "react-router-dom";
import data from "./data";
import Home from "../Home/index";
import Service from "../Service/Service";
import Contact from "../Contact/index";
import Login from "../Login/index";
import { CustomDialog } from 'react-st-modal';
// const navName = ["TRANG CHỦ", "DỊCH VỤ", "THÚ CƯNG", "SẢN PHẨM", "BỘ SƯU TẬP", "GIỎ HÀNG", "LIÊN HỆ"]

const Navbar = () => {
  return (
      <>
      <section className="navlink-container">
        
            <nav >
                <Link to="/Home" exact className="pets-shop">PETS SHOP</Link>
            </nav>
            <nav className="navbar">
            <div className="navbar-container">
                {data.map((value) => 
                    <NavLink to={value.link} exact={value.exact} className="navbar-name"  
                    activeStyle={{fontWeight: "900",color: "#FFF338"}}>
                    {value.name}
                    </NavLink>
                )}
            </div>
            </nav> 
            
        
            <div className="container1">
            <div><NavLink to='/' className="profile">TÀI KHOẢN</NavLink></div>
            {/* <NavLink to='/Login' className="navlink" activeStyle={{fontWeight: "900",color: "#FFF338"}}>ĐĂNG NHẬP</NavLink> */}
            <button className="button-login"
                    onClick={async () => {
                    const result = await CustomDialog(<Login />, {
                        title: 'Đăng nhập',
                        showCloseIcon: true,
                    });
                    }}
            >
            ĐĂNG NHẬP
            </button>
            <p>/</p>
            <button className="button-login"
                    onClick={async () => {
                    const result = await CustomDialog(<Login />, {
                        title: 'Custom Dialog',
                        showCloseIcon: true,
                    });
                    }}
            >
            ĐĂNG KÝ
            </button>
            {/* <NavLink to='/' className="navlink">ĐĂNG KÍ</NavLink> */}
            </div>
      </section>
      <Switch className="navbar-content">
            <Route path="/Home" exact><Home/></Route>
            <Route path="/Service"><Service/></Route>
            <Route path="/Contact"><Contact/></Route>
            <Route path="/"><Login/></Route>
        </Switch>
      </>
  );
}
export default Navbar;