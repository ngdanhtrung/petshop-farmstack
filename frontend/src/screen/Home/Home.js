import React from 'react';
import {Link, Switch, Route} from "react-router-dom";
import './Home.css';
import Service from "../Service/Service";
import ima from '../../img/image-1.jpg'
import dichvu from '../../img/dichvu.jpg'
import dog from '../../img/icons8-dog-60.png'
import cat from '../../img/icons8-black-cat-60.png'
import foot from '../../img/icons8-cat-footprint-100.png'
import Icon from '../../component/Icon/iconDog';
import Service1 from "../Service/serviceSimple/serviceSimple";
import Contact from '../../component/Contact/Contact1/Contact1';
const Home = () => {
    return(
        <>
          <img src={ima} alt="img" className="img-home"></img>
          <section className="sec1">
           <div className="title">
            <Icon/>
            <h2>Chào mừng bạn đến với Pets Shop - Thế Giới Thú Cưng</h2>
            <div className="view-service">
              <img src={dichvu} alt="dich-vu" className="dich-vu"></img>
              <nav>
               <Link to= "/Service" exact className="link-service" >Xem các dịch vụ của Pets Shop</Link>  </nav>
               <Switch>
                 <Route path= "/Service" exact>
                   <Service></Service>
                 </Route>
               </Switch>
            </div>
           </div>
          </section>
          <section className="sec2">
            <div className="cart">
              <img src={dog} alt="icon" className="icon"></img>
              <div>
                <h3>Chữa bệnh cho thú cưng</h3>
                <h5>Dịch vụ thú y nhanh chóng</h5>
              </div>
            </div>
            <div className="cart">
              <img src={foot} alt="icon" className="icon"></img>
              <div>
                <h3>Chăm sóc cho thú cưng</h3>
                <h5>Nhận nuôi và cung cấp chỗ ở cho thú cưng</h5>
              </div>
            </div>
            <div className="cart">
              <img src={cat} alt="icon" className="icon"></img>
              <div>
                <h3>Bán sản phẩm dành cho thú cưng</h3>
                <h5>Phụ kiện dành cho thú cưng siêu dễ thương</h5>
              </div>
            </div>
          </section>
          <section className="sec3">
            <Icon/>
            <h2>Các dịch vụ của Pets Shop</h2>
            <Service1></Service1>
            
          </section>
          <Icon/>
          <section className="sec4">
            <h2>Liên hệ Pets Shop với tư cách Khách</h2>
            <Contact/>
          </section>
        </>
        
    );
}

export default Home;

