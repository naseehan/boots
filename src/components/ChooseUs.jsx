import React from "react";
import main1 from "../assets/main1.jpg";
import main2 from "../assets/main2.jpg";
import "../stylePages/chooseUs/App.css";
const ChooseUs = () => {
  return (
    <div className="choose-us-container">
      <div className="common-pic">
        <img src={main1} alt="jr sports" />
        <h2>SHOP NOW</h2>
        
      </div>
      <div className="common-pic">
        <h2>WHY CHOOSE US</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          eveniet veritatis, ex ratione quae sit, est consequuntur veniam eum
          magni quod error debitis? Odio magnam culpa adipisci mollitia cumque
          fugiat?
        </p>

        <button className="buyNow">Buy Now</button>
        <img src={main2} alt="jr sports" />
      </div>
    </div>
  );
};

export default ChooseUs;
