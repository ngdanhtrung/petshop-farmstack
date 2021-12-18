import React, { Component } from "react";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import axios from "axios";

const { Title } = Typography;
const { Header, Content } = Layout;

export default class SignIn extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const setUsername = (user) => {
      this.setState({
        username: user,
      });
    };
    const setPassword = (password) => {
      this.setState({
        password: password,
      });
    };
    const setError = (error) => {
      this.setState({
        error: error,
      });
    };

    const getUserRequest = `${process.env.REACT_APP_API_KEY}users/me`;
    const getLoggedInUser = async () => {
      await axios
        .get(getUserRequest, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          setUsername(res.data.username);
          console.log(res.data.username);
          document.location.href = "/Dashboard";
        })
        .catch((error) => console.log(error));
    };
    // const [username, setUsername];
    // const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const urlRequest = `${process.env.REACT_APP_API_KEY}users/login`;
    const handleClickLogin = async (e) => {
      e.preventDefault();
      if (!this.state.username) {
        setError("Vui lòng nhập tên người dùng");
        return;
      }
      if (!this.state.password) {
        setError("Vui lòng nhập mật khẩu");
        return;
      }
      const loginFormData = new FormData();
      loginFormData.append("username", this.state.username);
      loginFormData.append("password", this.state.password);

      try {
        // make axios post request
        await axios({
          method: "POST",
          url: urlRequest,
          data: loginFormData,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          console.log(res);
          getLoggedInUser();
        });
      } catch (error) {
        // console.log(error);
        setError(error.response.data.detail);
      }
    };
    return (
      <>
        <Layout className="layout-default layout-signin">
          <Header>
            <div className="header-col header-brand">
              <h5>Admin Dashboard</h5>
            </div>
          </Header>
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Đăng nhập</Title>
                <Title className="font-regular text-muted" level={5}>
                  Nhập tài khoản và mật khẩu để đăng nhập
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Tài khoản"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Xin vui lòng nhập tài khoản!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tài khoản"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Xin vui lòng nhập mật khẩu!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập mật khẩu"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      onClick={handleClickLogin}
                    >
                      ĐĂNG NHẬP
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
}
