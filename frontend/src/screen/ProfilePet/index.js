import React from 'react'
import {
  useParams,
  useRouteMatch
} from "react-router-dom";
import data from '../Pets/data';
import "./styles.css"
import {FaPaw} from 'react-icons/fa'
import {GrFormNextLink} from 'react-icons/gr'
import {Link} from 'react-router-dom'
import Icon from '.././../component/Icon/icon2'
const ProfilePet = () => {
    let params = useParams();
    let pet;
    data.map((value) => {
        if (value.id == params.id)
            pet = value;
    });
    let { url } = useRouteMatch();
    return (
        <>
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
                    <div className="btn-adopt btn-adopt1 "><Link className="adopt btn-profile-adopt" to={`${url}`}>Nhận nuôi <FaPaw/></Link></div> 
                </div>
            </div>
            <Icon title="Các thú cưng khác"/>
            <div className="row-profile-pet">
                {[1,2,3].map(p => <div className="col">
                    <div className="profile-card-more">
                        <img src={pet.src1}></img>
                        <div className="icon-profile">
                            <img src={pet.src2}></img>
                        </div>
                    </div>
                    <Link to={`${url}`}><GrFormNextLink className="btn-icon"/></Link>
                </div>)}
                <div className="btn-1" ><Link className="view-more" to="/Pets">Xem thêm thú cưng</Link></div>
            </div>
            
        </>
    )
}

export default ProfilePet

