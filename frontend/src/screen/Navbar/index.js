import React from "react";
import './styles.css';
import { Link, NavLink, Switch, Route } from "react-router-dom";
import data from "./data";
import Home from "../Home/index";
import Service from "../Service/index";
import Contact from "../Contact/index";
import Login from "../Login/index";
import Register from "../Register/index";
import Pets from "../Pets/index";
import { CustomDialog } from 'react-st-modal';
// const navName = ["TRANG CHỦ", "DỊCH VỤ", "THÚ CƯNG", "SẢN PHẨM", "BỘ SƯU TẬP", "GIỎ HÀNG", "LIÊN HỆ"]

const Navbar = () => {
  return (
      <>
      <section className="navlink-container">
        
            <nav >
                <Link to="/" exact className="pets-shop">PETS SHOP</Link>
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
            <div className="space">/</div>
            <button className="button-login"
                    onClick={async () => {
                    const result = await CustomDialog(<Register />, {
                        title: 'ĐĂNG KÝ',
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
            <Route path="/" exact><Home/></Route>
            <Route path="/Service"><Service/></Route>
            <Route path="/Contact"><Contact/></Route>
            <Route path="/Pets"><Pets/></Route>
        </Switch>
      </>
  );
}
export default Navbar;