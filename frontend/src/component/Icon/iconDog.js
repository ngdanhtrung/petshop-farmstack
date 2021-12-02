import React from 'react';
import './iconDog.css';
import svg from '../../img/dog-paw.svg'

const iconDog = (props) => {
    return (
        <>
        <div className="title-icon">
              <img src={svg} alt="feet-dog" className="feet-dog"></img> 
         </div>
         <h2>{props.title}</h2>
         </>
    )
}

export default iconDog;
