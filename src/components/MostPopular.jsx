import React from "react";
import products from "./products";
import "../stylePages/mostPopular/App.css";
import { useNavigate } from "react-router-dom";

const MostPopular = () => {
  const navigate = useNavigate();

  const handleClick = (slug) => {
    navigate(`/products/${slug}`);
  };

  return (
    <div className="most-popular-container">
      <div className="cate-heading">
        <h1 className="h1-heading">Most Popular Products</h1>
      </div>
      <div className="popular mts">
        {products.shoes.slice(0, 4).map((product) => (
          <div className="each-products" key={product.id}>
            <img src={product.image} alt={product.name} loading="lazy" />
            <div className="product-details">
              <h2>{product.name}</h2>
              <div>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half"></i>
              </div>
              <p style={{ textTransform: "uppercase" }}>{product.category}</p>
              <p style={{ fontSize: "18px", fontWeight: 500 }}>
                INR : ₹ {product.price}
              </p>
              <button
                onClick={() => handleClick(product.slug)}
                className="popular-button"
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopular;
