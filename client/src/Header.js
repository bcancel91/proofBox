import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import proofboxlogo from "./images/proofboxlogo.png";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

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

const Header = () => {
  return (
    <div className="mainHeader">
      <a className="logo" href="#">
        <img
          style={{ height: "100px", width: "300px" }}
          src={proofboxlogo}
          alt="document logo"
        />
      <div className="search-container">
        <InstantSearch searchClient={searchClient} indexName="receipts">
          <SearchBox />
        </InstantSearch>
      </div>

      <div className="mainHeaderRight">
        <button className="main-button">
          <a href="/signup">Signup</a>
        </button>
        <button className="main-button">
          <Link to="login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
