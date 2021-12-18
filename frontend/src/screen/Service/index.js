import React from 'react'
import './index.css'
import Icon from '../../component/Icon/icon2'
import data from './data'
const Service = () => {
    return (
        <div className="container-service">
            <Icon title = "Các dịch vụ chăm sóc thú cưng"/>
            <div className="cards">
                {data.map((value, index) => 
                    <div key={index} className="card">
                        <img src={value.url} className="icon-card"></img>
                        <div className={value.className}>{value.title}</div>
                        <div className="content-card">{value.content}</div>
                    </div>
                )}
            </div>
            <Icon title = "Gửi thú cưng đến với Pets Shop"/>
            <form className="send-request">
                <div className="form2">
                    <label className="label-ser">Loại thú cưng:</label>
                    <select className="select">
                        <option value selected>Chó</option>
                        <option value >Mèo</option>
                    </select>
                </div>
                <div className="form2">
                    <label className="label-ser">Loại dịch vụ:</label>
                    <select className="select" style={{marginLeft: "35px"}}>
                        <option value selected>Chải lông cho thú cưng</option>
                        <option value >Huấn luyện thú cưng</option>
                        <option value >Chăm sóc thú cưng cả ngày</option>
                        <option value >Dắt thú cưng đi dạo</option>
                    </select>
                </div>
                <button type="submit" className="send" style={{height: "50px", fontSize: "17px"}}>Gửi yêu cầu </button>
            </form>
            <Icon title = ""/>
        </div>
        
    )
}

export default Service
