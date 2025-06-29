import React from "react";
import data from "./CatesData";
import "../stylePages/Categories/App.css";
import { useNavigate } from "react-router-dom";

const Categories = () => {

const navigate = useNavigate()

const handleClick = () => {
  navigate("/products")
}

  return (
    <div className="common-container">
      <div className="cate-heading mt">
        <h1 className="h1-heading">Our Categories</h1>
      </div>
      <div className="cates mts">
        {data.map((data, index) => {
          return (
            <div className="each-cates" key={index} onClick={() => handleClick(data.name)}>
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
