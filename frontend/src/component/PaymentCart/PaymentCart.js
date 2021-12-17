import React from "react";
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
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">Địa chỉ</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Địa chỉ"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Số điện thoại"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="more">Thông tin bổ sung</Label>
                <Input id="more" name="more" type="textarea" />
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
                <tr>
                  <td>chó Alaska nâu đỏ × 1</td>
                  <td>12.000.000₫</td>
                </tr>
                <tr>
                  <td>chó Alaska nâu đỏ × 1</td>
                  <td>12.000.000₫</td>
                </tr>
              </tbody>
            </table>
            <p style={{ marginTop: "auto" }}>
              <strong>Trả tiền mặt khi nhận hàng</strong>
            </p>
            <Button color="primary">Thanh toán</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentCart;
