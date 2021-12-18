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
import { Typography } from "antd";
import { useState, useEffect } from "react";
import { MinusOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const [series, setSeries] = useState([{}]);

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
       .get(`${process.env.REACT_APP_API_KEY}admin/totalAmountMonth`)
       .then((res) => {
         // setUsersMonth(res.data);
         res.data.map((item) => {
           const temp = {
             month: item._id.month,
             year: item._id.year,
             total: item.total,
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
           .map((item) => item.total);
         setSeries([
           {
             name: "Sales",
             data: arrMonthDisplay,
             offsetY: 0,
           },
         ]);
         console.log(arrMonthDisplay);
       });
   }, []);

  const lineChart = {
    series: [
      {
        name: "Mobile apps",
        data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
        offsetY: 0,
      },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },

      legend: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: arrMonth,
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  
  
  return (
    <>
      <div className='linechart'>
        <div>
          <Title level={5}>Bảng thống kê doanh thu</Title>
          <Paragraph className='lastweek'>
            Đây là bảng thống kê doanh thu trong 9 tháng vừa qua
          </Paragraph>
        </div>
        <div className='sales'>
          <ul>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className='full-width'
        options={lineChart.options}
        series={series}
        type='area'
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
