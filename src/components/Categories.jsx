import React from "react";
import data from "./CatesData";
import "../stylePages/Categories/App.css";

const Categories = () => {
  return (
    <div className="common-container">
      <div className="cate-heading mt">
        <h1 className="h1-heading">Our Categories</h1>
      </div>
      <div className="cates mts">
        {data.map((data, index) => {
          return (
            <div className="each-cates" key={index}>
              <img src={data.img} alt="categories" loading="lazy" />
              <p style={{ textTransform: "capitalize" }}>{data.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
