/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState , useEffect} from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  message,
  Button,
  Timeline,
  Table
} from "antd";
import {
  VerticalAlignBottomOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import card from "../assets/images/info-card-1.jpg";
import axios from "axios";
import moment from "moment";
import { CSVLink } from "react-csv";

function Home() {
  const { Title, Text } = Typography;

  const [userList, setUserList] = useState([{}]);
  const [paymentsList, setPaymentsList] = useState([{}]);

  useEffect((async () => {
    axios.get(`${process.env.REACT_APP_API_KEY}users`).then((res) => {
      setUserList(res.data);
      console.log(res.data);
    });
    axios
      .get(`${process.env.REACT_APP_API_KEY}payments/getPayments`)
      .then((res) => {
        setPaymentsList(res.data);
        console.log(res.data);
      });
  }), []);

  const usersColumns = [
    {
      title: "Mã người dùng",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thời điểm tạo tài khoản",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (moment(text).format("YYYY-MM-DD HH:mm"))
    },
  ];

  const paymentsColumns = [
    {
      title: "Mã thanh toán",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên khách",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày tạo đơn",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
  ];
  
  return (
    <>
      <div className='layout-content'>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} className='mb-24'>
            <Card bordered={false} className='criclebox cardbody h-full'>
              <div className='project-ant'>
                <div>
                  <Title level={5}>Danh sách người dùng</Title>
                  <Paragraph className='lastweek'>
                    Danh sách người dùng đã đăng ký trên hệ thống
                  </Paragraph>
                </div>
              </div>
              <div className='ant-list-box table-responsive'>
                <Table
                  columns={usersColumns}
                  dataSource={userList}
                  pagination={{ position: ["bottomCenter"] }}
                />
              </div>
              <div className='uploadfile shadow-none'>
                <Button
                  type='dashed'
                  className='ant-full-box'
                  icon={<VerticalAlignBottomOutlined />}
                >
                  <CSVLink
                    data={userList}
                    filename={moment().format("[User List] YYYY-MM-DD HH:mm")}
                  >
                    <span className='click'>Click to Download</span>
                  </CSVLink>
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} className='mb-24'>
            <Card bordered={false} className='criclebox cardbody h-full'>
              <div className='project-ant'>
                <div>
                  <Title level={5}>Danh sách hoá đơn</Title>
                  <Paragraph className='lastweek'>
                    Danh sách các đơn hàng đã thanh toán
                  </Paragraph>
                </div>
              </div>
              <div className='ant-list-box table-responsive'>
                <Table
                  columns={paymentsColumns}
                  dataSource={paymentsList}
                  pagination={{ position: ["bottomCenter"] }}
                />
              </div>
              <div className='uploadfile shadow-none'>
                <Button
                  type='dashed'
                  className='ant-full-box'
                  icon={<VerticalAlignBottomOutlined />}
                >
                  <CSVLink
                    data={paymentsList}
                    filename={moment().format("[Payments List] YYYY-MM-DD HH:mm")}
                  >
                    <span className='click'>Click to Download</span>
                  </CSVLink>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
