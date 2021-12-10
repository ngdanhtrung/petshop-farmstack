import React from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import { useState } from "react";
import "../Login/index.css";

const Register = () => {
  const dialog = useDialog();

  const [value, setValue] = useState();

  return (
    <form className='form'>
      <div className='form-input'>
        <label className='label'>Tên người dùng: </label>
        <input
          type='text'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <div className='form-input'>
        <label className='label'>Email: </label>
        <input
          type='text'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <div className='form-input'>
        <label className='label'>Mật khẩu: </label>
        <input
          type='text'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <div className='form-input'>
        <label className='label'>Nhập lại mật khẩu: </label>
        <input
          type='text'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <button
        className='btn-login'
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
      >
        ĐĂNG KÝ
      </button>
    </form>
  );
};

export default Register;
