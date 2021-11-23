import React from 'react'
import {Link} from "react-router-dom";
import './serviceSimple.css'
import Cut from '../../../img/chai-long.png';
import Nhannuoi from '../../../img/nhan-nuoi.png';
import Tiem from '../../../img/tiem.png';
import Huanluyen from '../../../img/huan-luyen.png';

const serviceSimple = () =>  {
    return (
        <>
        <div className="section-service">
            <Link className="cart-2">
            <img src={Cut} alt="icon" className="icon"></img>
              <div>
                <h3>Chải lông cho thú cưng</h3>
                <p>Spa và Massage trong lúc tắm, giúp thú thú cưng thư giãn. Sấy kết hợp chải chải lông để loại bỏ lớp lông thừa bám trên thú cưng. Chải lông tạo kiểu theo yêu cầu. </p>
              </div>
            </Link>
            <Link className="cart-2">
            <img src={Nhannuoi} alt="icon" className="icon"></img>
              <div>
                <h3>Nhận nuôi thú cưng</h3>
                <p>Pets Shop hỗ trợ kết nối người cho và người nhận. Pets Shop có thể yêu càu bạn một ít kinh phí nếu lưu lại chó mèo tại Pets Shop để chờ người nhận nuôi. Kinh phí này dùng chi phí thức ăn cho những ngày đầu tiên tiếp nhận. </p>
              </div>
            </Link>
            <Link className="cart-2">
            <img src={Huanluyen} alt="icon" className="icon"></img>
              <div>
                <h3>Huấn luyện cho thú cưng</h3>
                <p>Dạy chó ngừng sủa khi gặp người lạ, dạy thú cưng đi vệ sinh đúng cách,...</p>
              </div>
            </Link>
            <Link className="cart-2">
            <img src={Tiem} alt="icon" className="icon"></img>
              <div>
                <h3>Tiêm ngừa cho thú cưng</h3>
                <p>Tiêm ngừa là cách tốt nhất để thú cưng của bạn chôngs được bệnh nguy hiểm, bệnh truyền nhiễm. Từ đó đó tránh dược thiệt hại về kinh tế của bạn cũng cũng như tính mạng của thú cưng</p>
              </div>
            </Link>
        </div>
        </>
    )
}

export default serviceSimple;
