import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardImg,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import {
  Input,
  Label,
  CardText,
  CardSubtitle,
  Button,
  CardBody,
  CardTitle,
} from "reactstrap";
import axios from "axios";
//import './index.css'
const Payment = () => {
  let params = useParams();
  const [pet, setPet] = useState(null);
  const urlRequest = `${process.env.REACT_APP_API_KEY}products/getSingleProduct`;

  const getPet = async () => {
    await axios
      .get(`${urlRequest}/${params.id}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPet();
  }, [params.id]);
  return (
    <>
      {pet && (
        <Container className='payment' style={{ marginTop: 30 }}>
          <Row xs='4'>
            <Col xs='8' className='bg-light border'>
              <Form>
                <h1>Thông tin thanh toán</h1>
                <FormGroup>
                  <Label for='fullname'>Tên</Label>
                  <Input
                    id='fullname'
                    name='fullname'
                    placeholder='Tên'
                    type='text'
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='address'>Địa chỉ</Label>
                  <Input
                    id='address'
                    name='address'
                    placeholder='Địa chỉ'
                    type='text'
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='phone'>Số điện thoại</Label>
                  <Input
                    id='phone'
                    name='phone'
                    placeholder='Số điện thoại'
                    type='text'
                  />
                </FormGroup>

                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    placeholder='Email'
                    type='text'
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='more'>Thông tin bổ sung</Label>
                  <Input id='more' name='more' type='textarea' />
                </FormGroup>
              </Form>
            </Col>
            <Col xs='4' className='bg-light border'>
              <Card style={{ width: "100%" }}>
                <CardImg
                  alt='Card image cap'
                  src={pet.image}
                  top
                  width='100%'
                />
                <CardBody>
                  <CardTitle tag='h5'>{pet.name}</CardTitle>
                  <CardSubtitle className='mb-2 text-muted' tag='h6'>
                    {pet.value}
                  </CardSubtitle>
                  <CardText>{pet.description}</CardText>
                  <Button>Nhận nuôi</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Payment;
