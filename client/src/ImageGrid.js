import React from "react";
import "./ImageGrid.css";
import image1 from "./images/receipt1.jpeg";

const ImageGrid = () => {
  return (
    <div className="image-grid-container">
      <img className="image" alt="receipt-image" src={image1} />

      <img className="image" alt="receipt-image" src={image1} />

      <img className="image" alt="receipt-image" src={image1} />
    </div>
  );
};

export default ImageGrid;
