import React from 'react'
import {
  useParams,
  useRouteMatch
} from "react-router-dom";
import data from '../Pets/data';
import "./styles.css"
import {FaPaw} from 'react-icons/fa'

const ProfilePet = () => {
    let params = useParams();
    let pet;
    data.map((value) => {
        if (value.id == params.id)
            pet = value;
    });
    return (
        <div className="profile-pet">
            <img className="img-pet" src={pet.src}></img>
            <div className="profile-content">
                <h3>Tên: <span>{pet.name}</span></h3>
                <ul className="info-pet">
                    <li><FaPaw className="li-icon"/>Giống: {pet.male}</li>
                    <li><FaPaw className="li-icon"/>Loại: {pet.type}</li>
                    <li><FaPaw className="li-icon"/>Xuất xứ: {pet.origin}</li>
                    <li><FaPaw className="li-icon"/>Tuổi: {pet.age}</li>
                    <li><FaPaw className="li-icon"/>Chiều cao: {pet.height}cm</li>
                    <li><FaPaw className="li-icon"/>Cân nặng: {pet.weight}kg</li>
                    <li><FaPaw className="li-icon"/>Đặc điểm: {pet.characteristic}</li>
                    <li><FaPaw className="li-icon"/>Màu lông: {pet.color}</li>
                </ul>
            </div>
        </div>
    )
}

export default ProfilePet

