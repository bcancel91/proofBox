import React, { useState, useEffect } from "react";
import image1 from "../images/receipt1.jpeg";
import { useParams } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import ImageGrid from "../ImageGrid";
import receiptsApi from "../api/receiptsApi";

import DefaultImg from "../images/default-img.jpg";
import Vegas1 from "../images/vegas1.jpg";

const tempUserId = "5eb1db49c60713417c30c8b7";

const endpoint = "http://localhost:8000/api/receipt/add-receipt/" + tempUserId;

const Home = () => {
  const [userReceipts, setUserReceipts] = useState([]);

  const params = useParams();

  const [state, setState] = useState({
    receiptName: "",
    name: "",
    subtotal: "",
    category: "",
    total: "",
    file: null,
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

  const updateReceipt = (receipt_id) => {
    const response = receiptsApi.updateReceipt(receipt_id);
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

  function onChange(e) {
    setState({
      [e.target.name]: e.target.value,
    });
  }

  const handleSelectedFile = (e) => {
    e.preventDefault();
    setState({
      name: e.target.value,
      file: e.target.files[0],
    });
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log("data", data);
    data.append("file", state.file, state.name);

    axios.post(endpoint, data).then(() => {
      console.log("finished for now");
    });
  };

  return (
    <div>
      <div className="image-box">
        <img
          src={Vegas1}
          style={{ height: "320px", width: "1500px" }}
          alt="coverphoto"
        ></img>
      </div>
      <div className="receipt-results">
        <div className="title-section">
          <h3 style={{ margin: "10px" }}>Manage Expenses</h3>
          <table id="receipts">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Subtotal</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
            {userReceipts.map((item, index) => {
              return (
                <tr className="receipt-individual">
                  <td style={{ fontWeight: "bold" }}> {item.receiptName}</td>
                  <td>
                    <img
                      className="receipt-image-small"
                      style={{ height: "30px", width: "30px" }}
                      src={
                        "https://proofbox-bucket-2.s3.amazonaws.com/" +
                        item.name
                          .replace(/:/g, "")
                          .replace(/\\/g, "")
                          .replace(/C/g, "")
                          .replace(/fakepath/, "")
                      }
                    ></img>
                  </td>
                  <td> {item.category}</td>
                  <td>$ {item.subtotal}</td>
                  <td>$ {item.total}</td>
                  <td>{item.date}</td>
                  <button
                    className="update-button"
                    onClick={() => updateReceipt(item.id)}
                  >
                    Update
                  </button>
                  <button
                    index={item._id}
                    onClick={() => deleteReceipt(item._id)}
                    className="delete-button"
                  >
                    X
                  </button>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <div className="form-Container">
        <div className="receipt-form-container">
          <form
            onSubmit={handleUpload}
            encType="multipart/form-data"
            className="receipt-form"
          >
            <input
              name="receiptName"
              value={state.receiptName}
              placeholder="Receipt Name"
              onChange={onChange}
            ></input>
            <input
              name="category"
              value={state.category}
              placeholder="Category"
              onChange={onChange}
            ></input>

            <input
              name="subtotal"
              value={state.subtotal}
              placeholder="Subtotal"
              onChange={onChange}
            ></input>

            <input
              name="total"
              value={state.total}
              placeholder="Total"
              onChange={onChange}
            ></input>
            <input
              name="name"
              value={state.name}
              placeholder="Name"
              onChange={onChange}
            ></input>
            {/* <input
              name="category"
              value={state.category}
              placeholder="category"
              onChange={onChange}
            ></input>
            <input
              name="subtotal"
              value={state.subtotal}
              placeholder="subtotal"
              onChange={onChange}
            ></input>
            <input
              name="total"
              value={state.total}
              placeholder="total"
              onChange={onChange}
            ></input> */}

            <input
              name=""
              type="file"
              id=""
              placeholder="Upload Image"
              onChange={handleSelectedFile}
            ></input>
            <img src={state.imgSrc} alt="upload-image"></img>

            <button type="submit">Upload Receipt</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
