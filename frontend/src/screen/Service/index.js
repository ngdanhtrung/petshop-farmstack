import React from 'react'
import './index.css'
import Icon from '../../component/Icon/icon2'
import data from './data'
const Service = () => {
    return (
        <div className="container-service">
            <Icon title = "Các dịch vụ chăm sóc thú cưng"/>
            <div className="cards">
                {data.map((value) => 
                    <div className="card">
                        <img src={value.url} className="icon-card"></img>
                        <div className={value.className}>{value.title}</div>
                        <div className="content-card">{value.content}</div>
                    </div>
                )}
            </div>
        </div>
        
    )
}

export default Service
