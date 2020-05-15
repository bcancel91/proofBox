import React, { useState, useEffect } from "react";
import image1 from "../images/receipt1.jpeg";
import { useParams } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import ImageGrid from "../ImageGrid";
import receiptsApi from "../api/receiptsApi";

import DefaultImg from "../images/default-img.jpg";
import Vegas1 from "../images/vegas1.jpg";

const API_URL = "http://localhost:8000";

const Home = () => {
  const [userReceipts, setUserReceipts] = useState([]);

  const params = useParams();
  const tempUserId = "5eb1db49c60713417c30c8b7";

  const [state, setState] = useState({
    name: "",
    category: "",
    subtotal: "",
    total: "",
    multerImage: DefaultImg,
    user_id: tempUserId,
  });

  function setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      setState({
        multerImage: DefaultImg,
      });
    } else {
      setState({
        baseImage: DefaultImg,
      });
    }
  }

  function uploadImage(e, method) {
    let imageObj = {};

    if (method === "multer") {
      let imageFormObj = new FormData();

      imageFormObj.append("imageData", e.target.files[0]);

      setState({
        multerImage: URL.createdObjectURL(e.target.files[0]),
      });

      axios
        .post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using multer");
            setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("error while uploading image using multer");
          setDefaultImage("multer");
        });
    } else if (method === "firebase") {
      console.log("firebase");
    }
  }

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

  function handleChange(e) {
    const { value, name } = e.target;
    setState({
      [name]: value,
    });
  }

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
          <h3>Manage Expenses</h3>
          <table id="receipts">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Subtotal</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
            {userReceipts.map((item, index) => {
              return (
                <tr className="receipt-individual">
                  <td> {item.name}</td>
                  <td> {item.category}</td>
                  <td>$ {item.subtotal}</td>
                  <td>$ {item.total}</td>
                  <td>$ {item.date}</td>
                  <button onClick={() => updateReceipt(item.id)}>Update</button>
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
          <form enctype="multipart/form-data" className="receipt-form">
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

            <input
              name="imageURL"
              type="file"
              id="input-files"
              placeholder="Upload Image"
              onChange={(e) => this.uploadImage(e, "multer")}
            ></input>
            <img src={state.multerImage} alt="upload-image"></img>

            <button onClick={addReceipt}>Upload Receipt</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
