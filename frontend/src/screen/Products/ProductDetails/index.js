import React, { useEffect, useState } from "react";
import { addCart } from "../../../redux/actions";
import { connect } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import "./styles.css";
import axios from "axios";
const ProductDetails = ({ current, addCart }) => {
  let params = useParams();
  const [input, setInput] = useState(1);
  const [item, setItem] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    // updateCart(e.target.value);
  };

  const urlRequest = `${process.env.REACT_APP_API_KEY}items/addItem`;
  const getSingleProduct = `${process.env.REACT_APP_API_KEY}products/getSingleProduct`;
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
      })
      .catch((error) => console.log(error));
  };

  const getItem = async () => {
    await axios
      .get(`${getSingleProduct}/${params.id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  const addSingleItem = async (product) => {
    getLoggedInUser();
    if (username) {
      await axios
        .put(
          urlRequest,
          {
            id: product._id,
            name: product.name,
            image: product.image,
            quantity: input,
            value: product.value,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    } else {
      setMessage("Xin vui lòng đăng nhập trước");
    }
  };

  return (
    <>
      {" "}
      {item && (
        <div className='product-details'>
          <img className='products-detail-img' alt='img' src={item.image}></img>
          <div className='content-product-details'>
            <div className='product-details-name'>{item.name}</div>
            <div className='product-details-price'>
              <span>{item.value} đ</span>
            </div>
            <span className='product-details-description'>
              {item.description}
            </span>
            <div className='container-count-addCart'>
              <td className='table-numbercount'>
                <input
                  min='1'
                  max='20'
                  type='number'
                  id='qty'
                  name='qty'
                  value={input}
                  onChange={onChangeHandler}
                />
              </td>
              <button
                className='btn-add-to-cart1'
                onClick={() => addSingleItem(item)}
              >
                Thêm vào giỏ hàng
              </button>
              {message}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    current: state._todoProduct.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (id) => dispatch(addCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
