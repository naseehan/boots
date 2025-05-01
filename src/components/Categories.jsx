import React from 'react'
import data from "./CatesData"
import "../stylePages/Categories/App.css"

const Categories = () => {
    
  return (
    <div className='common-container'>
      <div className="cate-heading mt">
        <h1>Our Categories</h1>
        <button>Show More Categories</button>
      </div>
      <div className="cates mts">
       { data.map((data) => (
<div className='each-cates'>
<img src={data.img} alt="categories" loading='lazy'/>
        <p>{data.name}</p>
</div>
        ))
        }
      </div>
    </div>
  )
}

export default Categories
