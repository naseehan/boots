import React from 'react'
import homeImg from '../assets/home-img.png'
import '../stylePages/Home/App.css'
import Categories from '../components/Categories';
import BestSeller from '../components/BestSeller';
import ChooseUs from '../components/ChooseUs';
import InfiniteCarousel from '../components/InfiniteCarousel';
import MostPopular from '../components/MostPopular';
import homeBg from '../assets/heroBg.jpg'
import ProductCard from '../components/ProductCard';

const Home = () => {

  
  return (
    <>
    <div className='home-container'>
      <img src={homeBg} alt="home background" className='home-bg'/>
      <div className="homeOverlay"></div>
      {/* <div className="home"> */}
      <div className="main-image">
        <img src={homeImg} alt="" />
      </div>
      <div className="main-details">
        <div className="inside-div">
        <h1 style={{"color":"#ffb658","font-size": "3rem"}}>NIKE RUNNING</h1>
        <h3>WINNING ISNT COMFORTABLE</h3>
        <p>Browse our latest collectins and find the perfect equipments for your sports life. With a variety of designs, size and colors. there's something for everyone </p>
<button className="fancyBtn">View Collections</button>

        </div>
      </div>
      </div>
      
    {/* </div> */}
      <Categories />
      <MostPopular />
    <BestSeller />
    <ChooseUs />
    <InfiniteCarousel />
   {/* <ProductCard/> */}
    </>

  )
}

export default Home
