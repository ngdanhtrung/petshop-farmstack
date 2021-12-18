import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

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
  const history = useHistory();
  let params = useParams();
  const [pet, setPet] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [mail, setMail] = useState("");
  const [extra, setExtra] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState([]);
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

  const urlRequest = `${process.env.REACT_APP_API_KEY}products/getSingleProduct`;
  const payment = `${process.env.REACT_APP_API_KEY}payments/addPPet`;

  const getPet = async () => {
    await axios
      .get(`${urlRequest}/${params.id}`)
      .then((res) => {
        setPet(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickE = async () => {
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
            petID: pet._id,
            petName: pet.name,
            value: pet.value,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          setResult(res.data);
          setRedirect(true);
        })
        .catch((error) => {
          console.log(error.response);
          setMessage("Có trục trặc xảy ra");
        });
    } else {
      setMessage("Vui lòng điền thông tin cần thiết");
    }
  };

  useEffect(() => {
    getPet();
  }, [params.id]);

  if (redirect) {
    return <Redirect to={`/bill/${result._id}`} />;
  }
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
                    value={fullName}
                    onChange={handleName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='address'>Địa chỉ</Label>
                  <Input
                    id='address'
                    name='address'
                    placeholder='Địa chỉ'
                    type='text'
                    value={address}
                    onChange={handleAddress}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='phone'>Số điện thoại</Label>
                  <Input
                    id='phone'
                    name='phone'
                    placeholder='Số điện thoại'
                    type='text'
                    value={number}
                    onChange={handleNum}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    placeholder='Email'
                    type='text'
                    value={mail}
                    onChange={handleMail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='more'>Thông tin bổ sung</Label>
                  <Input
                    id='more'
                    name='more'
                    type='textarea'
                    value={extra}
                    onChange={handleExtra}
                  />
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
                  <Button onClick={handleClickE}>Nhận nuôi</Button>
                  {message}
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
