import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouteMatch } from "react-router-dom";
import data from "../Pets/data";
import "./styles.css";
import { FaPaw } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";
import Icon from ".././../component/Icon/icon2";
const ProfilePet = () => {
  let params = useParams();
  let { url } = useRouteMatch();
  const [pet, setPet] = useState(null);
  const [recommend, setRecommend] = useState([]);

  const urlRequest = `${process.env.REACT_APP_API_KEY}products/getSingleProduct`;
  const rec = `${process.env.REACT_APP_API_KEY}products/recommendPets`;

  const getRecommend = async (name, id) => {
    console.log(name);
    await axios
      .get(`${rec}/${name}/${id}`)
      .then((res) => {
        setRecommend(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPet = async () => {
    await axios
      .get(`${urlRequest}/${params.id}`)
      .then((res) => {
        setPet(res.data);
        getRecommend(res.data.name, res.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPet();
  }, []);

  return (
    <>
      {pet && (
        <>
          <div className='profile-pet'>
            <img className='img-pet' src={pet.image}></img>
            <div className='profile-content'>
              <h3>
                Tên: <span>{pet.name}</span>
              </h3>
              <ul className='info-pet'>
                <li>
                  <FaPaw className='li-icon' />
                  Giống: {pet.extra.gender}
                </li>
                <li>
                  <FaPaw className='li-icon' />
                  Loại: {pet.extra.type}
                </li>
                <li>
                  <FaPaw className='li-icon' />
                  Xuất xứ: {pet.extra.origin}
                </li>
                <li>
                  <FaPaw className='li-icon' />
                  Ngày sinh: {pet.extra.age}
                </li>
                <li>
                  <FaPaw className='li-icon' />
                  Chiều cao: {pet.extra.height}cm
                </li>
                <li>
                  <FaPaw className='li-icon' />
                  Cân nặng: {pet.extra.weight}kg
                </li>
                <li>
                  <FaPaw className='li-icon' />
                  Đặc điểm: {pet.extra.characteristic}
                </li>
                <li>
                  <FaPaw className='li-icon' />
                  Màu lông: {pet.extra.color}
                </li>
              </ul>
              <div className='btn-adopt btn-adopt1 '>
                <Link className='adopt btn-profile-adopt' to={`${url}`}>
                  Nhận nuôi <FaPaw />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {recommend && (
        <>
          <Icon title='Các thú cưng khác' />
          <div className='row-profile-pet'>
            {recommend.map((pet) => (
              <div className='col'>
                <div className='profile-card-more'>
                  <img src={pet.image}></img>
                  <div className='icon-profile'>
                    <img src={pet.image}></img>
                  </div>
                </div>
                <Link to={`${url}`}>
                  <GrFormNextLink className='btn-icon' />
                </Link>
              </div>
            ))}
            <div className='btn-1'>
              <Link className='view-more' to='/Pets'>
                Xem thêm thú cưng
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePet;
