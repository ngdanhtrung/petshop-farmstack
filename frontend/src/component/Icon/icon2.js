// rfcae
import React from 'react'
import { FaPaw } from "react-icons/fa";
import './icon2.css'
const icon2 = (props) => {
    return (
        <>
        <div className="sec-icon2">
            <FaPaw className="fa fa-paw puple"/>
            <FaPaw className="fa fa-paw orange"/>
            <FaPaw className="fa fa-paw puple"/>
        </div>
        <h2>{props.title}</h2>
        </>
    )
}

export default icon2
