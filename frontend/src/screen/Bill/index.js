import axios from "axios";
import React, { useState, useEffect } from "react";

import "./index.css";

const Bill = () => {
  return (
    <>
      <div className="invoice-box">
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr className="top">
              <td colSpan={2}>
                <table>
                  <tbody>
                    <tr>
                      <td className="title">
                        <img
                          src="https://www.sparksuite.com/images/logo.png"
                          style={{ width: "100%", maxWidth: "300px" }}
                        />
                      </td>
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
                        Sparksuite, Inc.
                        <br />
                        12345 Sunny Road
                        <br />
                        Sunnyville, CA 12345
                      </td>
                      <td>
                        Acme Corp.
                        <br />
                        John Doe
                        <br />
                        john@example.com
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bill;
