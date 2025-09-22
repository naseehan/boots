import React from "react";
import main1 from "../assets/main1.jpg";
import main2 from "../assets/main2.jpg";
import "../stylePages/chooseUs/App.css";
import { Link } from "react-router-dom";
const ChooseUs = () => {
  return (
    <div className="choose-us-container">
      <div className="common-pic">
        <img src={main1} alt="jr sports" loading="lazy"/>
        
      </div>
      <div className="common-pic">
        <h4>WHY CHOOSE US</h4>
        <p>
          At Signature Sports, we believe the right gear makes all the difference. That’s why we offer top-quality sports apparel, footwear, and equipment from trusted brands to help you perform at your best. Whether you’re training, competing, or staying active, our easy shopping experience, fast shipping, and dedicated support ensure you get exactly what you need, when you need it.
        </p>

        <Link to="/products" className="buyNow text-decoration-none">Buy Now</Link>
        <img src={main2} alt="jr sports" loading="lazy"/>
      </div>
    </div>
  );
};

export default ChooseUs;
