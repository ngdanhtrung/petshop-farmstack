import React, { useEffect, useState } from "react";
import "./styles.css";
import { connect } from "react-redux";
import { Link, NavLink, Switch, Route, Redirect } from "react-router-dom";
import data from "./data";
import Home from "../Home/index";
import Service from "../Service/index";
import Contact from "../Contact/index";
import Login from "../Login/index";
import Register from "../Register/index";
import Pets from "../Pets/index";
import Products from "../Products/Products";
import Cart from "../Cart/index";
import { CustomDialog } from "react-st-modal";
import axios from "axios";
// const navName = ["TRANG CHỦ", "DỊCH VỤ", "THÚ CƯNG", "SẢN PHẨM", "BỘ SƯU TẬP", "GIỎ HÀNG", "LIÊN HỆ"]

const Navbar = ({ cart }) => {
  const [username, setUsername] = useState("");
  const getUserRequest = `${process.env.REACT_APP_API_KEY}users/me`;
  const getCartRequest = `${process.env.REACT_APP_API_KEY}items/listItems`;

  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart1, setCart] = useState([]);

  const getCart = async () => {
    await axios
      .get(getCartRequest, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setCart(res.data.cart);
        console.log(res.data.cart);
      });
  };

  const getLoggedInUser = async () => {
    await axios
      .get(getUserRequest, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        console.log(res.data.username);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let count = 0;
    let price = 0;
    cart1.forEach((item) => {
      count += item.quantity;
      price += item.quantity * item.value;
    });

    setCartCount(count);
    setTotalPrice(price);
  }, [cart1]);
  useEffect(getLoggedInUser, []);
  useEffect(getCart, []);

  return (
    <>
      <section className='navlink-container'>
        <nav>
          <Link to='/' exact className='pets-shop'>
            PETS SHOP
          </Link>
        </nav>
        <nav className='navbar'>
          <div className='navbar-container'>
            {data.map((value) => (
              <NavLink
                to={value.link}
                exact={value.exact}
                className='navbar-name'
                activeStyle={{ fontWeight: "900", color: "#FFF338" }}
              >
                {value.name}
              </NavLink>
            ))}
            <NavLink
              className='navbar-name'
              activeStyle={{ fontWeight: "900", color: "#FFF338" }}
              to='/Cart'
            >
              {/* GIỎ HÀNG {cartCount}{" "} */}
              GIỎ HÀNG
            </NavLink>
          </div>
        </nav>

        <div className='container1'>
          <div>
            <NavLink to='/' className='profile'>
              {username ? "XIN CHÀO, " + username : "TÀI KHOẢN"}
            </NavLink>
          </div>
          {/* <NavLink to='/Login' className="navlink" activeStyle={{fontWeight: "900",color: "#FFF338"}}>ĐĂNG NHẬP</NavLink> */}
          {username ? (
            <button
              className='button-login'
              onClick={async () => {
                localStorage.removeItem("access_token");
                setUsername("");
              }}
            >
              ĐĂNG XUẤT
            </button>
          ) : (
            <>
              <button
                className='button-login'
                onClick={async () => {
                  const result = await CustomDialog(
                    <Login getLoggedInUser={getLoggedInUser} />,
                    {
                      title: "Đăng nhập",
                      showCloseIcon: true,
                    }
                  );
                }}
              >
                ĐĂNG NHẬP
              </button>
              <div className='space'>/</div>
              <button
                className='button-login'
                onClick={async () => {
                  const result = await CustomDialog(<Register />, {
                    title: "ĐĂNG KÝ",
                    showCloseIcon: true,
                  });
                }}
              >
                ĐĂNG KÝ
              </button>
            </>
          )}
          {/* <NavLink to='/' className="navlink">ĐĂNG KÍ</NavLink> */}
        </div>
      </section>
      <Switch className='navbar-content'>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/Service'>
          <Service />
        </Route>
        <Route path='/Contact'>
          <Contact />
        </Route>
        <Route path='/Pets'>
          <Pets />
        </Route>
        <Route path='/Products'>
          <Products />
        </Route>
        <Route path='/Cart'>
          <Cart />
        </Route>
      </Switch>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state._todoProduct.cart,
  };
};

export default connect(mapStateToProps)(Navbar);
