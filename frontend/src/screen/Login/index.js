import React from 'react'
import {  useDialog } from 'react-st-modal';
import {useState} from 'react'
import './index.css'

const Login = () => {
    const dialog = useDialog();
    const [value, setValue] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleClickLogin = () => {
      if (!username) {
        alert("Cảnh báo", "Vui lòng nhập tên người dùng");
        return;
      }
      if (!password) {
          alert("Cảnh bảo", "Vui lòng nhập mật khẩu");
          return;
      }
      dialog.close(value);
    }
    return (
      <form className="form">
        <div className="form-input">
          <label className="label">Tên người dùng: </label>
          <input
            type="text"
            onChange={(e) => {setUsername(e.target.value);
            }}
        />
        </div>
        <div className="form-input">
          <label className="label">Mật khẩu: </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
            className="btn-login"
          onClick={handleClickLogin}
        >
          ĐĂNG NHẬP
        </button>
      </form>
    );
}

export default Login;
