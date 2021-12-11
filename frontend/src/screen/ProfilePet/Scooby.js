import React from 'react'
import {
  useParams,
  useRouteMatch
} from "react-router-dom";
import data from './../Pets/data';

const Scooby = () => {
    let params = useParams();
    let pet;
    data.map((value) => {
        if (value.id == params.id)
            pet = value;
    });
    return (
        <div>
            <h3>Đây là trang của {pet.name}</h3>
            <h3>Tuổi {pet.age}</h3>
        </div>
    )
}

export default Scooby

