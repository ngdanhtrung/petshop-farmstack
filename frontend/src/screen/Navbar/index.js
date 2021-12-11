import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, NavLink, Switch, Route, Redirect } from "react-router-dom";
import data from "./data";
import Home from "../Home/index";
import Service from "../Service/index";
import Contact from "../Contact/index";
import Login from "../Login/index";
import Register from "../Register/index";
import Pets from "../Pets/index";
import Scooby from "../ProfilePet/Scooby";
import { CustomDialog } from "react-st-modal";
import axios from "axios";
// const navName = ["TRANG CHỦ", "DỊCH VỤ", "THÚ CƯNG", "SẢN PHẨM", "BỘ SƯU TẬP", "GIỎ HÀNG", "LIÊN HỆ"]

const Navbar = () => {
  const [username, setUsername] = useState("");
  const getUserRequest = `${process.env.REACT_APP_API_KEY}users/me`;

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
  useEffect(getLoggedInUser, []);

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
        <Route path='/Pets/Scooby'>
          <Scooby />
        </Route>
      </Switch>
    </>
  );
};
export default Navbar;
