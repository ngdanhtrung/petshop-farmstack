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
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { FundProjectionScreenOutlined } from "@ant-design/icons";

function EChart() {
  const { Title, Paragraph } = Typography;

  const [users, setUsers] = useState();
  const [pets, setPets] = useState();
  const [products, setProducts] = useState();
  const [payments, setPayments] = useState();
  const [series, setSeries] = useState([{}]);
  // const urlRequest = `${process.env.REACT_APP_API_KEY}admin`;
  
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const thisMonth = moment().format("M");
  const arrMonth = range(thisMonth - 11, thisMonth, 1);
  console.log(arrMonth);
  let arrMonthData = [];
  let arrMonthDisplay = [];

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_KEY}admin/count/`)
      .then((res) => {
        setUsers(res.data.users);
        setPets(res.data.pets);
        setProducts(res.data.items);
        setPayments(res.data.payments);
        console.log(res.data);
      }).catch((error) => {
        console.log(error.response)
      });
    await axios
      .get(`${process.env.REACT_APP_API_KEY}admin/countUsers`)
      .then((res) => {
        // setUsersMonth(res.data);
        res.data.map((item) => {
          const temp = {
            month: item._id.month,
            year: item._id.year,
            count: item.count,
          };
          arrMonthData.push(temp);
        });
        console.log(res.data);
        arrMonthDisplay = arrMonthData
          .filter(
            (item) =>
              item.month >= thisMonth - 11 &&
              item.month <= thisMonth &&
              item.year == 2021
          )
          .sort((a, b) => a.month - b.month)
          .map((item) => item.count);
        setSeries([
          {
            name: "Users",
            data: arrMonthDisplay,
            color: "#fff",
          },
        ]);
        console.log(arrMonthDisplay);
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
      Title: payments,
      user: "Số đơn hàng",
    },
  ];

  //EChart from here  
  const eChart = {
    series: [
      {
        name: "Sales",
        data: arrMonthDisplay,
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: arrMonth,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val + " người dùng";
          },
        },
      },
    },
  };

  return (
    <>
      <div id='chart'>
        <ReactApexChart
          className='bar-chart'
          options={eChart.options}
          series={series}
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
