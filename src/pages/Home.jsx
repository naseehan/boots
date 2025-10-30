import React from "react";
import homeImg from "../assets/home-img1.webp";
import "../stylePages/Home/App.css";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import ChooseUs from "../components/ChooseUs";
import InfiniteCarousel from "../components/InfiniteCarousel";
import MostPopular from "../components/MostPopular";
import homeBg from "../assets/heroBg1.webp";
import { Link } from "react-router-dom";

const Home = () => {

  <script>
  AOS.init();
</script>

  return (
    <>
      <div className="home-container">
        <img
          src={homeBg}
          alt="home background"
          className="home-bg"
          height="866px"
        />
        <div className="homeOverlay"></div>
        {/* <div className="home"> */}
        <div className="main-image" data-aos="fade-right" data-aos-delay="500">
          <img src={homeImg} alt="home image"  />
        </div>
        <div className="main-details" data-aos="fade-left" data-aos-delay="500">
          <div className="inside-div">
            <h1 style={{ color: "#ffb658", "font-size": "3rem" }}>
              SIGNATURE SPORTS
            </h1>
            <h2>BEST SPORTS SHOP IN KALLAMBALAM</h2>
            <p>
              Browse our latest collectins and find the perfect equipments for
              your sports life. With a variety of designs, size and colors.
              there&apos;s something for everyone
            </p>
            <Link to="/products"><button className="fancyBtn">View Collections</button></Link>
            
          </div>
        </div>
      </div>

      <Categories />
      <MostPopular />
      <BestSeller />
      <ChooseUs />
      <InfiniteCarousel />
    </>
  );
};

export default Home;
