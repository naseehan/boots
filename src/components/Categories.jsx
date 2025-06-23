import React from 'react'
import data from "./CatesData"
import "../stylePages/Categories/App.css"

const Categories = () => {
    
  return (
    <div className='common-container'>
      <div className="cate-heading mt">
        <h1 className='h1-heading'>Our Categories</h1>
        <button>Show More Categories</button>
      </div>
      <div className="cates mts">
       { data.map((data, index) => {
        
        return(
<div className='each-cates' data-aos={index % 2 == 0 ? 'fade-up' : 'fade-down'} key={index} data-aos-duration="800">
<img src={data.img} alt="categories" loading='lazy'/>
        <p>{data.name}</p>
</div>
       )}
       )}
      </div>
    </div>
  )
}

export default Categories
