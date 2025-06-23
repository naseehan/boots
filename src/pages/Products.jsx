import React from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  return (
    <div className="product-container">
      <div className="text-center my-4">
        <p>Our Products</p>
        <h1
          className="fw-bold"
          style={{ fontFamily: "Edu QLD Hand, cursive",fontSize: '4rem' }}
        >
          Greatness awaits you
        </h1>
      </div>
      <ProductCard />
    </div>
  );
};

export default Products;
