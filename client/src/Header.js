import React from "react";
import "./Header.css";

const Header = () => {

    return (
       <div className="mainHeader">
           <a href="#">Proofbox</a>

           <div className="mainHeaderRight">
           <a href="#">Signup</a>
           <a href="#">Login</a>
           </div>
       </div>
    )
}

export default Header;