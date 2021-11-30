import React from "react";
import './Navbar.css';
import { Link, NavLink, Routes, Route } from "react-router-dom";
import data from "./data";
import Home from ".././screens/Home/Home"
import Service from ".././screens/Service/Serviec"
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
              <NavLink to='/' className="navlink">ĐĂNG NHẬP</NavLink>
              <NavLink to='/' className="navlink">ĐĂNG KÍ</NavLink>
              </div>
         
          
          {/* <Switch>
              {data.map((value) => 
                  <Route path= {value.link} exact={value.exact} component={value.component}></Route>
              )}
              
          </Switch> */}
          
  
        </section>
        <Routes className="navbar-content">
              <Route path="/Home" exact><Home/></Route>
              <Route path="/Service"><Service/></Route>
          </Routes>
        </>
    );
  }
  export default Navbar;