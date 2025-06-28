
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../stylePages/bestSeller/App.css';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

import products from './products';


export default function BestSeller() {
  return (
    <div >
    <div className="best-seller-heading">
        <h1 className='h1-heading'>Our Best Sellers</h1>
      </div>
    <div className='swiper-container'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {products.shoes.slice(0,4).map((product)=> (
 <SwiperSlide>
          <img src={product.image} loading="lazy"/>
          <p style={{alignSelf: "center", fontSize: "19px", fontFamily: 600, textAlign:"center"}}>{product.name}</p>
        </SwiperSlide>
        ))}
             
      </Swiper>
    
    </div>
    </div>
  );
}

