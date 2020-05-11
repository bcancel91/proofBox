import React, { useState, useEffect } from "react";
import image1 from "../images/receipt1.jpeg";
import { useParams } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import ImageGrid from "../ImageGrid";
import receiptsApi from "../api/receiptsApi";

const Home = () => {
  const [userReceipts, setUserReceipts] = useState([]);

  const params = useParams();
  const tempUserId = "5eb1db49c60713417c30c8b7";

  const [state, setState] = useState({
    name: "",
    category: "",
    subtotal: "",
    total: "",
    user_id: tempUserId,
  });

  const addReceipt = async (e) => {
    e.preventDefault();
    const response = await receiptsApi.addReceiptToUser(state);

    console.log("response", response);
    // const receiptData = await receiptsApi.fetchReceipts();

    // setUserReceipts(receiptData)
    fetchReceipts();
    const data = await response.json();
    console.log("data", data);
    setState(data);
  };

  const deleteReceipt = (receipt_id) => {
    const response = receiptsApi.deleteReceipt(receipt_id);
  };

  const fetchReceipts = async () => {
    try {
      const response = await receiptsApi.getUserReceipts(tempUserId);
      const result = await response.json();
      setUserReceipts(result);

      console.log("result", result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  // change handler

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  return (
    <div>
      <div className="image-box">
        <ImageGrid />
      </div>
      <div className="receipt-results">
        {userReceipts.map((item, index) => {
          return (
            <div className="receipt-items">
              <div> Name: {item.name}</div>
              <div> Category: {item.category}</div>
              <div>Subtotal: $ {item.subtotal}</div>
              <div> Total: $ {item.total}</div>
              <button
                index={item._id}
                onClick={() => deleteReceipt(item._id)}
                className="delete-button"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="form-Container">
        <div className="receipt-form-container">
          <form className="receipt-form">
            <input
              name="name"
              value={state.name}
              placeholder="Name"
              onChange={handleChange}
            ></input>
            <input
              name="category"
              value={state.category}
              placeholder="category"
              onChange={handleChange}
            ></input>
            <input
              name="subtotal"
              value={state.subtotal}
              placeholder="subtotal"
              onChange={handleChange}
            ></input>
            <input
              name="total"
              value={state.total}
              placeholder="total"
              onChange={handleChange}
            ></input>

            <button onClick={addReceipt}>Upload Receipt</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
