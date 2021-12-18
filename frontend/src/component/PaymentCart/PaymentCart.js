import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import { Input, Label, Table } from "reactstrap";

import "./index.css";

const PaymentCart = () => {
  const [cart1, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [mail, setMail] = useState("");
  const [extra, setExtra] = useState("");
  const [message, setMessage] = useState("");
  const handleName = (e) => {
    setFullName(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleNum = (e) => {
    setNumber(e.target.value);
  };

  const handleMail = (e) => {
    setMail(e.target.value);
  };

  const handleExtra = (e) => {
    setExtra(e.target.value);
  };
  const urlRequest = `${process.env.REACT_APP_API_KEY}items/listItems`;
  const payment = `${process.env.REACT_APP_API_KEY}payments/addPayment`;

  const getCart = async () => {
    await axios
      .get(urlRequest, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setCart(res.data.cart);
        console.log(res.data.cart);
      });
  };

  const submitPayment = async () => {
    if ((fullName, address, number)) {
      await axios
        .post(
          payment,
          {
            name: fullName,
            address: address,
            number: number,
            email: mail,
            extra: extra,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then(() => {
          setMessage("Thanh toán thành công");
        });
    } else {
      setMessage("Vui lòng điền thông tin cần thiết");
    }
  };
  useEffect(() => {
    if (cart1) {
      let price = 0;
      cart1.forEach((item) => {
        price += item.quantity * item.value;
      });
      setTotalPrice(price);
    }
  }, [cart1]);

  useEffect(getCart, []);

  return (
    <>
      <Container className="payment" style={{ marginTop: 30 }}>
        <Row xs="4">
          <Col xs="6" className="bg-light border" style={{ padding: 20 }}>
            <Form>
              <h1>Thông tin thanh toán</h1>
              <FormGroup>
                <Label for="fullname">Tên</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder="Tên"
                  type="text"
                  value={fullName}
                  onChange={handleName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">Địa chỉ</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Địa chỉ"
                  type="text"
                  value={address}
                  onChange={handleAddress}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Số điện thoại"
                  type="text"
                  value={number}
                  onChange={handleNum}
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="text"
                  value={mail}
                  onChange={handleMail}
                />
              </FormGroup>
              <FormGroup>
                <Label for="more">Thông tin bổ sung</Label>
                <Input
                  id="more"
                  name="more"
                  type="textarea"
                  value={extra}
                  onChange={handleExtra}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col
            xs="6"
            className="bg-light border"
            style={{ display: "flex", flexDirection: "column", padding: 20 }}
          >
            <h1>Đơn hàng của bạn</h1>
            <table className="tableCart">
              <thead>
                <tr>
                  <th>SẢN PHẨM</th>
                  <th>TIỀN</th>
                </tr>
              </thead>
              <tbody>
                {cart1 &&
                  cart1.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.name} x {item.quantity}
                      </td>
                      <td>{item.quantity * item.value} ₫</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <hr></hr>
            <p style={{ marginTop: "auto" }}>
              {" "}
              Hình thức thanh toán:
              <strong style={{ float: "right" }}>
                Trả tiền mặt khi nhận hàng
              </strong>
            </p>
            <p style={{ marginTop: "auto" }}>
              {" "}
              Tổng tiền:
              <strong style={{ float: "right" }}>{totalPrice} ₫</strong>
            </p>
            <Button color="primary" onClick={submitPayment}>
              Thanh toán
            </Button>
            {message}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentCart;
