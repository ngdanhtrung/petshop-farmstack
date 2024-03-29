import React from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import { useState } from "react";
import axios from "axios";
import "../Login/index.css";

const Register = () => {
  const dialog = useDialog();

  const [username, setUserName] = useState();
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState("");
  const urlRequest = `${process.env.REACT_APP_API_KEY}users/register`;

  const registerhandler = (e) => {
    e.preventDefault();
    console.log(urlRequest);
    if (password === confirmPassword) {
      axios
        .post(urlRequest, {
          username: username,
          email: email,
          fullname: fullname,
          pwd: password,
        })
        .then((response) => {
          setError(response.data.detail);
          // console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
          let message;
          if (error.response !== undefined && error.response.data !== undefined && error.response.data.detail !== undefined && error.response.data.detail[0] != undefined) {
            let detail = error.response.data.detail;
            message = detail[0].msg ? detail[0].msg : detail;
          } else {
            message = "Lỗi request!";
          }
          setError(message);
        });
    }
  };

  return (
    <form className='form'>
      <div className='form-input'>
        <label className='label'>Tên đăng nhập: </label>
        <input
          type='text'
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className='form-input'>
        <label className='label'>Họ và tên: </label>
        <input
          type='text'
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
      </div>
      <div className='form-input'>
        <label className='label'>Email: </label>
        <input
          type='text'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className='form-input'>
        <label className='label'>Mật khẩu: </label>
        <input
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className='form-input'>
        <label className='label'>Nhập lại mật khẩu: </label>
        <input
          type='password'
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <div className='form-input'>
        <label className='label-error'>{error}</label>
      </div>
      <button className='btn-login' onClick={registerhandler}>
        ĐĂNG KÝ
      </button>
    </form>
  );
};

export default Register;
