import React from "react";
import "./Header.css";

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
          <a href="/login">Login</a>
        </button>
      </div>
    </div>
  );
};

export default Header;
