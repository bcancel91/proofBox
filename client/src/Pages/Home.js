import React, { useState, useEffect } from "react";
import image1 from "../images/receipt1.jpeg";
import { useParams } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import ImageGrid from "../ImageGrid";
import receiptsApi from "../api/receiptsApi";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

// search area

const searchClient = algoliasearch(
  "FRJVR4E6Y4",
  "c85d022bc27816c31277cfc57bc250ff"
);

const Hit = ({ hit }) => {
  console.log("hit", hit);
  return (
    <div>
      <p>
        {hit.name} || {hit.category}
      </p>
    </div>
  );
};

const Home = () => {
  const [userReceipts, setUserReceipts] = useState([]);

  const params = useParams();
  const tempUserId = "5eb1db49c60713417c30c8b7";

  const [state, setState] = useState({
    name: "",
    category: "",
    subtotal: "",
    total: "",
    imageURL: "",
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
        <div className="search-container">
          <InstantSearch searchClient={searchClient} indexName="receipts">
            <SearchBox />
            <Hits hitComponent={Hit} />
          </InstantSearch>
        </div>
      </div>
      <div className="receipt-results">
        <table id="receipts">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Subtotal</th>
            <th>Total</th>
          </tr>
          {userReceipts.map((item, index) => {
            return (
              <tr className="receipt-individual">
                <td> {item.name}</td>
                <td> {item.category}</td>
                <td>$ {item.subtotal}</td>
                <td>$ {item.total}</td>
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
            <input
              name="imageURL"
              value={state.total}
              placeholder="Upload Image"
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
