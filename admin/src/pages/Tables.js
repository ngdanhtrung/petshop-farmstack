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
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import {
  Avatar, Button, Card, Col, message,
  Progress, Radio, Row, Table, Typography, Upload
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
// Images
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import { CSVLink } from "react-csv";
import moment from "moment";


function Tables() {
  const { Title } = Typography;

  const formProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [productsList, setProductsList] = useState([{}]);

  const getPetList = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_KEY}products/getProducts`)
      .then((res) => {
        setProductsList(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(getPetList, []);

  // table code start
  const columns = [
    {
      title: "AUTHOR",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "FUNCTION",
      dataIndex: "function",
      key: "function",
    },

    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "EMPLOYED",
      key: "employed",
      dataIndex: "employed",
    },
  ];

  const data = [
    {
      key: "1",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className='shape-avatar'
              shape='square'
              size={40}
              src={face2}
            ></Avatar>
            <div className='avatar-info'>
              <Title level={5}>Michael John</Title>
              <p>michael@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className='author-info'>
            <Title level={5}>Manager</Title>
            <p>Organization</p>
          </div>
        </>
      ),

      status: (
        <>
          <Button type='primary' className='tag-primary'>
            ONLINE
          </Button>
        </>
      ),
      employed: (
        <>
          <div className='ant-employed'>
            <span>23/04/18</span>
            <a href='#pablo'>Edit</a>
          </div>
        </>
      ),
    },

    {
      key: "2",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className='shape-avatar'
              shape='square'
              size={40}
              src={face3}
            ></Avatar>
            <div className='avatar-info'>
              <Title level={5}>Alexa Liras</Title>
              <p>alexa@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className='author-info'>
            <Title level={5}>Programator</Title>
            <p>Developer</p>
          </div>
        </>
      ),

      status: (
        <>
          <Button className='tag-badge'>ONLINE</Button>
        </>
      ),
      employed: (
        <>
          <div className='ant-employed'>
            <span>23/12/20</span>
            <a href='#pablo'>Edit</a>
          </div>
        </>
      ),
    },

    {
      key: "3",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className='shape-avatar'
              shape='square'
              size={40}
              src={face}
            ></Avatar>
            <div className='avatar-info'>
              <Title level={5}>Laure Perrier</Title>
              <p>laure@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className='author-info'>
            <Title level={5}>Executive</Title>
            <p>Projects</p>
          </div>
        </>
      ),

      status: (
        <>
          <Button type='primary' className='tag-primary'>
            ONLINE
          </Button>
        </>
      ),
      employed: (
        <>
          <div className='ant-employed'>
            <span>03/04/21</span>
            <a href='#pablo'>Edit</a>
          </div>
        </>
      ),
    },
    {
      key: "4",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className='shape-avatar'
              shape='square'
              size={40}
              src={face4}
            ></Avatar>
            <div className='avatar-info'>
              <Title level={5}>Miriam Eric</Title>
              <p>miriam@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className='author-info'>
            <Title level={5}>Marketing</Title>
            <p>Organization</p>
          </div>
        </>
      ),

      status: (
        <>
          <Button type='primary' className='tag-primary'>
            ONLINE
          </Button>
        </>
      ),
      employed: (
        <>
          <div className='ant-employed'>
            <span>03/04/21</span>
            <a href='#pablo'>Edit</a>
          </div>
        </>
      ),
    },
    {
      key: "5",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className='shape-avatar'
              shape='square'
              size={40}
              src={face5}
            ></Avatar>
            <div className='avatar-info'>
              <Title level={5}>Richard Gran</Title>
              <p>richard@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className='author-info'>
            <Title level={5}>Manager</Title>
            <p>Organization</p>
          </div>
        </>
      ),

      status: (
        <>
          <Button className='tag-badge'>ONLINE</Button>
        </>
      ),
      employed: (
        <>
          <div className='ant-employed'>
            <span>23/03/20</span>
            <a href='#pablo'>Edit</a>
          </div>
        </>
      ),
    },

    {
      key: "6",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className='shape-avatar'
              shape='square'
              size={40}
              src={face6}
            ></Avatar>
            <div className='avatar-info'>
              <Title level={5}>John Levi</Title>
              <p>john@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className='author-info'>
            <Title level={5}>Tester</Title>
            <p>Developer</p>
          </div>
        </>
      ),

      status: (
        <>
          <Button className='tag-badge'>ONLINE</Button>
        </>
      ),
      employed: (
        <>
          <div className='ant-employed'>
            <span>14/04/17</span>
            <a href='#pablo'>Edit</a>
          </div>
        </>
      ),
    },
  ];
  // project table start
  const products = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "image",
      render: (text) => <Avatar size={64} src={text}/>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá sản phảm",
      dataIndex: "value",
      render: (text) => <NumberFormat value={text} displayType={"text"} thousandSeparator={true} suffix="VND"/>,
    }
  ];
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]}>
          <Col xs='24' xl={24}>
            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              title='Bảng danh sách các thú cưng'
            >
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className='ant-border-space'
                />
              </div>
            </Card>

            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              title='Bảng danh sách các sản phẩm'
            >
              <div className='table-responsive'>
                <Table
                  columns={products}
                  dataSource={productsList}
                  pagination={{ position: ["bottomCenter"] }}
                  className='ant-border-space'
                />
              </div>
              <div className='uploadfile pb-15 shadow-none'>
                <Upload {...formProps}>
                  <Button
                    type='dashed'
                    className='ant-full-box'
                    icon={<VerticalAlignBottomOutlined />}
                  >
                    <CSVLink
                      data={productsList}
                      filename={moment().format(
                        "[Products List] YYYY-MM-DD HH:mm"
                      )}
                    >
                      <span className='click'>Click to Download</span>
                    </CSVLink>
                  </Button>
                </Upload>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Tables;
