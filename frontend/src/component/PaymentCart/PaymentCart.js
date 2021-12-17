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
              <h1>Thong tin thanh toan</h1>
              <FormGroup>
                <Label for="fullname">Ten</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder="Ten"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">Dia chi</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Dia chi"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">So dien thoai</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Dia chi"
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
                <Label for="more">Thong tin bo sung</Label>
                <Input id="more" name="more" type="textarea" />
              </FormGroup>
            </Form>
          </Col>
          <Col
            xs="6"
            className="bg-light border"
            style={{ display: "flex", flexDirection: "column", padding: 20 }}
          >
            <h1>Don hang cua ban</h1>
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
            <Button color="primary">Thanh toan</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentCart;
