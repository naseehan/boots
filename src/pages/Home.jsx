import React from 'react'
import homeImg from '../assets/home-img.png'
import '../stylePages/Home/App.css'
import Categories from '../components/Categories';
import BestSeller from '../components/BestSeller';
import ChooseUs from '../components/ChooseUs';
import InfiniteCarousel from '../components/InfiniteCarousel';
import MostPopular from '../components/MostPopular';

const Home = () => {
  return (
    <>
    <div className='home-container'>
      {/* <div className="home"> */}
      <div className="main-image">
        <img src={homeImg} alt="" />
      </div>
      <div className="main-details">
        <div className="inside-div">
        <h1>NIKE RUNNING</h1>
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
 
    </>

  )
}

export default Home
