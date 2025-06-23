import React from "react";
import { useParams } from "react-router-dom";
import products from "../components/products";
import styled from "styled-components";
import { div } from "motion/react-client";
import Carousel from "../components/ProductCarousel";
import "../stylePages/contactButton/App.css"

const ProductWrapper = styled.div`
  margin-top: -18%;
  padding-left: 20%;

  @media (max-width: 1230px){
  margin-top: 0;
  padding-left: 0;
  }
  @media (max-width: 995px){
  margin-bottom: 40px;
  padding: 2rem;
  }
`;

const ProductDetails = () => {
  const { slug } = useParams();
  const flatProducts = Object.values(products).flat()
  const product = flatProducts.find((p) => p.slug === slug);
 
  

  if (!product) return <p>Page not found</p>;
  return (
    <div>
    <div
      className="d-grid justify-content-center"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(390px, 1fr))" }}
    >
      <div>
        <img src={product.image} alt={product.name} className="w-100" />
      </div>
      <ProductWrapper className="d-flex flex-column justify-content-center mx-auto gap-4">
        <div
          className="border-bottom"
          style={{ borderColor: "rgb(218, 218, 218)", paddingBottom: "21px" }}
        >
          <h2
            className="text-uppercase fw-normal text-start mb-1"
            style={{
              fontSize: "20px",
              letterSpacing: "0.1em",
              lineHeight: "112%",
            }}
          >
            Signature sports
          </h2>
          <h1
            className="fw-semibold text-uppercase mt-0"
            style={{
              fontSize: "32px",
              lineHeight: "112%",
              letterSpacing: "0.1em",
              fontFamily: '"Oswald", sans-serif',
            }}
          >
            {product.name}
          </h1>
        </div>
        {/* <button></button> */}
        <p className="p-font fs-5 lh-base text-uppercase">
          Rs. {product.price}
        </p>
        <p className="p-font">{product.desc}</p>


<button className="cta" onClick={() => ( window.open(
      `https://wa.me/917034546546?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`,
      "_blank"
    ))}>
  <span className="hover-underline-animation"> Contact Shop </span>
  <svg
    id="arrow-horizontal"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="10"
    viewBox="0 0 46 16"
  >
    <path
      id="Path_10"
      data-name="Path 10"
      d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
      transform="translate(30)"
    ></path>
  </svg>
</button>

        {/* <button >Contact Shop</button> */}
      </ProductWrapper>

      
    </div>
    <Carousel />
    </div>
  );
};

export default ProductDetails;
