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
import { useState, useEffect } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  message,
  Button,
  Timeline,
  Table,
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

  const [reverse, setReverse] = useState(false);
  const [userList, setUserList] = useState([{}]);

  const getUsersList = () => {
    axios.get(`${process.env.REACT_APP_API_KEY}users`).then((res) => {
      setUserList(res.data);
      console.log(res.data);
    });
  };

  const [role, setRole] = useState("");
  const urlRequest = `${process.env.REACT_APP_API_KEY}users/loginAdmin`;

  const getLoggedInUser = async () => {
    await axios
      .get(urlRequest, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setRole(res.data.role);
        console.log(res.data.role);
      })
      .catch(() => (document.location.href = "/sign-in"));
  };

  useEffect(getLoggedInUser, []);

  useEffect(getUsersList, []);

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  const columns = [
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
                  columns={columns}
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
            <Card bordered={false} className='criclebox h-full'>
              <div className='timeline-box'>
                <Title level={5}>Orders History</Title>
                <Paragraph className='lastweek' style={{ marginBottom: 24 }}>
                  this month <span className='bnb2'>20%</span>
                </Paragraph>

                <Timeline
                  pending='Recording...'
                  className='timelinelist'
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type='primary'
                  className='width-100'
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
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
