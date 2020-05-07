import React from "react";
import "./senerios.body.css";



const SeneriosContainer = () => {

    return (
    <div className="container-fluid">
       <div className="row">
        <div className="col-6 nonUser">
                <h3 className="seneriosTitle">NON proofBox user</h3>
           <img src="https://via.placeholder.com/100" className="nonUserImg"></img>
            <p>blah blah blah blah blah blah blah </p>
            <p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah </p>
        </div>
        <div className="col-6 proofBoxUser">
                <h3 className="seneriosTitle">proofBox user</h3>
           <img src="https://via.placeholder.com/100" className="userImg"></img>
            <p>blah blah blah blah blah blah blah blah</p>
            <p>blah blah blah blah blah blah blah blah</p>
            <p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah </p>
        </div>
         
        </div>
        </div>
     
    )
}

export default SeneriosContainer;