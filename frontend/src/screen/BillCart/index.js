import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import Pdf from "react-to-pdf";
import "./index.css";

const ref = React.createRef();

const BillCart = () => {
  let params = useParams();
  const [payment, setPayment] = useState([]);
  const [cart, setCart] = useState([]);
  const urlRequest = `${process.env.REACT_APP_API_KEY}payments/findPayment`;

  const getPayment = async () => {
    await axios
      .get(`${urlRequest}/${params.id}`)
      .then((res) => {
        setPayment(res.data);
        setCart(res.data.user.cart);
        console.log(res.data);
        console.log(res.data.user.cart);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPayment();
  }, []);

  return (
    <>
      {payment && (
        <div className='invoice-box' ref={ref}>
          <table cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr className='top'>
                <td colSpan={2}>
                  <table>
                    <tbody>
                      <tr>
                        <td className='title'>PETS SHOP</td>
                        <td>
                          Invoice #: {payment._id}
                          <br />
                          Created: {payment.created_at}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className='information'>
                <td colSpan={2}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          PETS SHOP
                          <br />
                          An Dương Vương, Quận 5
                          <br />
                          TPHCM
                        </td>
                        <td>
                          Nhóm ComChien
                          <br></br>
                          petshop@example.com
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className='heading'>
                <td>Phương thức thanh toán</td>
                <td></td>
              </tr>
              <tr className='details'>
                <td>Thanh toán khi nhận hàng</td>
                <td></td>
              </tr>
              <tr>
                <td>Full name:</td>
                <td>{payment.name}</td>
              </tr>
              <tr className='heading'>
                <td>Tên sản phẩm</td>
                <td>Giá tiền:</td>
              </tr>
              <tr className='item'></tr>
              {cart.map((item) => (
                <>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.value} đ</td>
                  </tr>
                </>
              ))}

              <tr className='total'>
                <td />
                <td>Tổng tiền: {payment.amount} đ</td>
              </tr>
            </tbody>
          </table>
          <Pdf targetRef={ref} filename='post.pdf'>
            {({ toPdf }) => <button style={{backgroundColor: '#E7470C', color: '#fff', border: '1px solid #e7470c'}} onClick={toPdf}>Xuất file PDF</button>}
          </Pdf>
        </div>
      )}
    </>
  );
};

export default BillCart;
