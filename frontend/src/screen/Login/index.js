import React from "react";
import { useDialog } from "react-st-modal";
import { useState } from "react";
import "./index.css";
import axios from "axios";

const Login = () => {
  const dialog = useDialog();
  const [value, setValue] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const urlRequest = `${process.env.REACT_APP_API_KEY}users/login`;

  const handleClickLogin = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Vui lòng nhập tên người dùng");
      return;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }
    const loginFormData = new FormData();
    loginFormData.append("username", username);
    loginFormData.append("password", password);

    try {
      // make axios post request
      await axios({
        method: "POST",
        url: urlRequest,
        data: loginFormData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        dialog.close();
      });
    } catch (error) {
      // console.log(error);
      setError(error.response.data.detail);
    }
  };
  return (
    <form className='form'>
      <div className='form-input'>
        <label className='label'>Tên người dùng: </label>
        <input
          type='text'
          onChange={(e) => {
            setUsername(e.target.value);
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
        <label className='label-error'>{error}</label>
      </div>
      <button className='btn-login' onClick={handleClickLogin}>
        ĐĂNG NHẬP
      </button>
    </form>
  );
};

export default Login;
