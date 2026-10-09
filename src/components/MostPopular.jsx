import { useState, useEffect } from "react";
import "../stylePages/mostPopular/App.css";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/productsApi";
import staticProducts from "./products";

const MostPopular = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ group: "shoes" })
      .then((data) => {
        const shoes = Array.isArray(data) && data.length > 0 ? data : staticProducts.shoes;
        setProducts(shoes.slice(4, 8));
      })
      .catch(() => setProducts(staticProducts.shoes.slice(4, 8)))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (slug) => {
    navigate(`/products/${slug}`);
  };

  if (loading) {
    return (
      <section className="common-container most-popular-section" aria-labelledby="popular-heading">
        <div className="cate-heading mt">
          <div>
            <h2 id="popular-heading" className="h1-heading">Most Popular Products</h2>
            <p className="section-subtitle">
              Customer favorites tested for durability, agility, and elite comfort.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
            color: "var(--text-muted)",
          }}
          role="status"
          aria-live="polite"
        >
          <div className="spinner-athletic" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="common-container most-popular-section" aria-labelledby="popular-heading">
      <div className="cate-heading mt">
        <div>
          <h2 id="popular-heading" className="h1-heading">
            Most Popular Products
          </h2>
          <p className="section-subtitle">
            Customer favorites tested for durability, agility, and elite comfort.
          </p>
        </div>
      </div>
      <div className="popular-grid mts">
        {products.map((product) => (
          <article className="popular-card" key={product._id}>
            <div className="popular-card-media" onClick={() => handleClick(product.slug)}>
              <span className="popular-category-badge">{product.category}</span>
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                width="280"
                height="200"
              />
            </div>
            <div className="popular-card-body">
              <h3 className="popular-card-title" onClick={() => handleClick(product.slug)}>
                {product.name}
              </h3>
              <div className="popular-rating" aria-label={`Rated ${product.rating || 4.5} out of 5 stars`}>
                <div className="stars-icons">
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                </div>
                <span className="rating-score">{product.rating || 4.5}</span>
              </div>
              <div className="popular-card-footer">
                <div className="popular-price">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">{product.price.toLocaleString("en-IN")}</span>
                </div>
                <button
                  onClick={() => handleClick(product.slug)}
                  className="btn-popular-action"
                  aria-label={`View details for ${product.name}`}
                >
                  View Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MostPopular;
