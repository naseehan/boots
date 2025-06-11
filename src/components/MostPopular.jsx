import React from 'react'
import products from './products'
import '../stylePages/mostPopular/App.css'

const MostPopular = () => {
  return (
    <div className='most-popular-container'>
        <div className="cate-heading">
        <h1 className='h1-heading'>Most Popular Products</h1>
        </div>
        <div className="popular mts">
      {products.map((product) => (
        <div className="each-products" key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className='product-details'>
          <h2>{product.name}</h2>
          <i className="fa-solid fa-star"></i>
          <p>{product.category}</p>
          <p>INR : ₹ {product.price}</p>
          <button>Add To Cart</button>
          </div>
        </div>
      ))}
</div>
    </div>
  )
}

export default MostPopular
