import React from "react";
import "./demo.body.css";



const DemoContainer = () => {

    return (
        <div className="container-fluid">
       <div className="row">
         <div className="col-3 uploadBox">
         <h2> Demo Image</h2>
        <img src="https://via.placeholder.com/150" className="demoImg"></img>
        </div>
         <div className="col-3 uploadBox">
         <h2> Demo Image</h2>
        <img src="https://via.placeholder.com/150" className="demoImg"></img>
         </div>
         <div className="col-3 uploadBox">
         <h2> Demo Image</h2>
        <img src="https://via.placeholder.com/150" className="demoImg"></img>
         </div>
         <div className="col-3 uploadBox">
         <h2> Demo Image</h2>
        <img src="https://via.placeholder.com/150" className="demoImg"></img>
         </div>
        </div>
        </div>
     
    )
}

export default DemoContainer;