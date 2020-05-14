import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mainHeader">
      <a className="logo" href="/">
        Proofbox
      </a>

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
