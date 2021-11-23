import React from 'react';
import './iconDog.css';
import svg from '../../img/dog-paw.svg'

const iconDog = () => {
    return (
        <div className="title-icon">
              <img src={svg} alt="feet-dog" className="feet-dog"></img>
            </div>
    )
}

export default iconDog;
