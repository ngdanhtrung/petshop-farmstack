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

import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import { useState, useEffect } from "react";
import axios from "axios";

function EChart() {
  const { Title, Paragraph } = Typography;

  const [users, setUsers] = useState();
  const [pets, setPets] = useState();
  const [products, setProducts] = useState();

  // const urlRequest = `${process.env.REACT_APP_API_KEY}admin`;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_KEY}admin/count/`).then((res) => {
      setUsers(res.data.users);
      setPets(res.data.pets);
      setProducts(res.data.items);
      console.log(res.data);
    });
  }, []);

  const items = [
    {
      Title: users,
      user: "Người dùng",
    },
    {
      Title: pets,
      user: "Thú nuôi",
    },
    {
      Title: products,
      user: "Sản phẩm",
    },
    {
      Title: 0,
      user: "Thu Nhập",
    },
  ];

  return (
    <>
      <div id='chart'>
        <ReactApexChart
          className='bar-chart'
          options={eChart.options}
          series={eChart.series}
          type='bar'
          height={300}
        />
      </div>
      <div className='chart-vistior'>
        <Title level={5}>Bảng thống kê số lượng người dùng</Title>
        <Paragraph className='lastweek'>
          Đây là bảng thống kê số lượng người dùng trong 9 tháng vừa qua
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className='chart-visitor-count'>
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
