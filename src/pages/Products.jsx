import React from "react";
import ProductCard from "../components/ProductCard";
import styled from "styled-components";

const Text = styled.p`
  font-size: 1.25rem;
  line-height: 1.625;
  color: rgb(71 85 105 / 1);
  max-width: 42rem;
  margin: 2rem auto;
`;

const Products = () => {
  return (
    <div className="product-container">
      <div className="text-center mx-auto my-5">
        <p>Our Products</p>
        <h1
          className="fw-bold"
          style={{ fontFamily: "Edu QLD Hand, cursive", fontSize: "4rem" }}
        >
          Greatness awaits you
        </h1>
        <Text>
          Discover our curated selection of high-performance athletic shoes
          designed for champions
        </Text>
      </div>
      <ProductCard />
    </div>
  );
};

export default Products;
