import React from "react";
import {
  Card,
  CardImg,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  Input,
  Label,
  CardText,
  CardSubtitle,
  Button,
  CardBody,
  CardTitle,
} from "reactstrap";

//import './index.css'
const Payment = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Container className="payment" style={{ marginTop: 30 }}>
        <Row xs="4">
          <Col xs="8" className="bg-light border">
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
          <Col xs="4" className="bg-light border">
            <Card style={{ width: "100%" }}>
              <CardImg
                alt="Card image cap"
                src="https://picsum.photos/256/186"
                top
                width="100%"
              />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                <Button>Nhận nuôi</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Payment;
