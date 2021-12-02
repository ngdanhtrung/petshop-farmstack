import React from 'react'
import { CustomDialog, useDialog } from 'react-st-modal';
import {useState} from 'react'

const Login = () => {
    const dialog = useDialog();

    const [value, setValue] = useState();
  
    return (
      <form>
          <div className="form-input">
          <label>Tên người dùng: </label>
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        </div>
        <div className="form-input">
         <label>Mật khẩu: </label>
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        </div>
        <button
          onClick={() => {
            // Сlose the dialog and return the value
            dialog.close(value);
          }}
        >
          ĐĂNG NHẬP
        </button>
      </form>
    );
}

export default Login;
