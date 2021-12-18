import axios from "axios";
import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import "./index.css";

const ref = React.createRef();

const Bill = () => {
  return (
    <>
      <div className="invoice-box" ref={ref}>
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr className="top">
              <td colSpan={2}>
                <table>
                  <tbody>
                    <tr>
                      <td className="title">PETS SHOP</td>
                      <td>
                        Invoice #: 123
                        <br />
                        Created: January 1, 2015
                        <br />
                        Due: February 1, 2015
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className="information">
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
            <tr className="heading">
              <td>Payment Method</td>
              <td>Check #</td>
            </tr>
            <tr className="details">
              <td>Check</td>
              <td>1000</td>
            </tr>
            <tr className="heading">
              <td>Item</td>
              <td>Price</td>
            </tr>
            <tr className="item">
              <td>Website design</td>
              <td>$300.00</td>
            </tr>
            <tr className="item">
              <td>Hosting (3 months)</td>
              <td>$75.00</td>
            </tr>
            <tr className="item last">
              <td>Domain name (1 year)</td>
              <td>$10.00</td>
            </tr>
            <tr className="total">
              <td />
              <td>Total: $385.00</td>
            </tr>
            <Pdf targetRef={ref} filename="post.pdf">
              {({ toPdf }) => <button onClick={toPdf}>Print PDF</button>}
            </Pdf>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bill;
