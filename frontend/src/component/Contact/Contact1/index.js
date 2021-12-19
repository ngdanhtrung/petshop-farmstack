import React from "react";
import "./index.css";

const Contact1 = () => {
  return (
    <form className="form-contact">
      <div className="container-contact">
        <input
          type="text"
          name="name"
          placeholder="Nhập tên của bạn"
          required
          className="input"
        ></input>
        <input
          type="text"
          name="email"
          placeholder="Nhập email của bạn"
          required
          className="input"
        ></input>
        <input
          type="number"
          name="phone"
          placeholder="Nhập số điện thoại của bạn"
          required
          className="input"
        ></input>
        <input
          type="date"
          name="date"
          placeholder="Nhập thời gian muốn trao đổi"
          required
          className="input"
        ></input>
        <input
          type="text"
          name="type"
          placeholder="Nhập thể loại thú cưng"
          required
          className="input"
        ></input>
        <input
          type="text"
          name="srv"
          placeholder="Nhập loại dịch vụ"
          required
          className="input"
        ></input>
      </div>
      <button type="submit" className="send">
        Gửi yêu cầu liên hệ
      </button>
    </form>
  );
};

export default Contact1;
