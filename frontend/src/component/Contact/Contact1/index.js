import React from "react";
import "./index.css";

const Contact1 = () => {
  return (
    <form className="form-contact">
      <div className="container-contact">
        <input
          type="text"
          value=""
          name="name"
          placeholder="Nhập tên của bạn"
          required
          className="input"
        ></input>
        <input
          type="text"
          value=""
          name="email"
          placeholder="Nhập email của bạn"
          required
          className="input"
        ></input>
        <input
          type="text"
          value=""
          name="phone"
          placeholder="Nhập số điện thoại của bạn"
          required
          className="input"
        ></input>
        <input
          type="text"
          value=""
          name="date"
          placeholder="Nhập thời gian muốn trao đổi"
          required
          className="input"
        ></input>
        <input
          type="text"
          value=""
          name="type"
          placeholder="Nhập thể loại thú cưng"
          required
          className="input"
        ></input>
        <input
          type="text"
          value=""
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
