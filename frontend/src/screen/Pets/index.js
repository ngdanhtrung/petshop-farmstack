import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import data from "./data";
import Icon from "../../component/Icon/icon2";
import { FaPaw } from "react-icons/fa";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import ProfilePet from "../ProfilePet/index";
const Pets = () => {
  let { path, url } = useRouteMatch();
  const [pets, setPets] = useState([]);
  const [input, setInput] = useState("");

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const urlRequest = `${process.env.REACT_APP_API_KEY}products/getPets`;
  const search = `${process.env.REACT_APP_API_KEY}products/searchPets`;

  const getPets = async () => {
    await axios
      .get(urlRequest)
      .then((res) => {
        setPets(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const searchPets = async () => {
    await axios
      .get(`${search}/${input}`)
      .then((res) => {
        setPets(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(getPets, [input]);
  useEffect(searchPets, [input]);
  return (
    <>
      <input value={input} onChange={onChangeHandler} />
      <div className='container-pets'>
        <Switch>
          <Route exact path={path}>
            <>
              <Icon title='Nhận nuôi thú cưng' />
              <div className='row'>
                {pets ? (
                  pets.map((value) => (
                    <div className='menber'>
                      <div>
                        <img className='img-pets' src={value.image}></img>
                      </div>
                      <div className='content'>
                        <h4>{value.name}</h4>
                        <ul className='info-pet'>
                          <li>
                            <FaPaw className='li-icon' />
                            Loại: {value.extra.type}
                          </li>
                          <li>
                            <FaPaw className='li-icon' />
                            Tuổi: {value.extra.age}
                          </li>
                          <li>
                            <FaPaw className='li-icon' />
                            Đặc điểm: {value.extra.characteristic}
                          </li>
                        </ul>
                      </div>
                      <div className='btn-adopt'>
                        <Link className='adopt' to={`/Pets/${value._id}`}>
                          Nhận nuôi <FaPaw />
                        </Link>
                      </div>

                      <hr></hr>
                    </div>
                  ))
                ) : (
                  <div>ko tìm thấy gì cả</div>
                )}
              </div>
            </>
          </Route>
          <Route exact path={`${path}/:id`} key={`${path}/:id`}>
            <ProfilePet />
          </Route>
        </Switch>
      </div>
      )
    </>
  );
};

export default Pets;
