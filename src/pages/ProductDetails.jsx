import { useParams, Link } from "react-router-dom";
import products from "../components/products";
import Carousel from "../components/ProductCarousel";
import "../stylePages/contactButton/App.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const flatProducts = Object.values(products).flat();
  const product = flatProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="common-container text-center py-5">
        <h1 className="h1-heading">Product Not Found</h1>
        <p>The product you are looking for does not exist or has been moved.</p>
        <Link to="/products" className="btn-athletic btn-athletic-primary mt-3">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi Signature Sports! I'm interested in purchasing "${product.name}" (Price: ₹${product.price}). Is it available at your Kallambalam store?`
    );
    window.open(`https://wa.me/917034546546?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="product-details-page">
      <div className="common-container">
        {/* Breadcrumb */}
        <nav className="product-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link to="/products">Products</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{product.name}</span>
        </nav>

        {/* Main Product Showcase */}
        <div className="product-showcase-grid">
          {/* Gallery Media */}
          <div className="product-media-card">
            <span className="product-detail-badge">{product.category}</span>
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-img"
              width="500"
              height="400"
              loading="eager"
            />
          </div>

          {/* Product Info & Action */}
          <div className="product-info-column">
            <div className="product-info-header">
              <span className="brand-subtext">Signature Sports Kallambalam</span>
              <h1 className="product-main-title">{product.name}</h1>
              <div className="product-meta-row">
                <span className="product-stock-tag">
                  <span className="stock-dot"></span> In Stock at Store
                </span>
                <span className="product-rating-tag">★ {product.rating || 4.5} Rating</span>
              </div>
            </div>

            <div className="product-price-box">
              <span className="price-tag-currency">₹</span>
              <span className="price-tag-val">{product.price.toLocaleString("en-IN")}</span>
              <span className="price-tax-note">(Inclusive of all taxes)</span>
            </div>

            <div className="product-description-box">
              <h2 className="desc-heading">Product Overview</h2>
              <p className="desc-body">{product.desc}</p>
            </div>

            {/* Quick Feature Perks */}
            <div className="product-perks-grid">
              <div className="perk-item">
                <span className="perk-icon">🛡️</span>
                <div>
                  <strong>100% Authentic</strong>
                  <p>Direct from authorized distributors</p>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">⚡</span>
                <div>
                  <strong>Fast In-Store Pickup</strong>
                  <p>Ready same day in Kallambalam</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Purchase CTA */}
            <div className="product-actions-group">
              <button
                className="btn-whatsapp-order"
                onClick={handleWhatsAppClick}
                aria-label={`Inquire about ${product.name} on WhatsApp`}
              >
                <i className="fa-brands fa-whatsapp fa-xl" aria-hidden="true"></i>
                <span>Order / Inquire via WhatsApp</span>
              </button>

              <a
                href="tel:+917034546546"
                className="btn-call-order"
                aria-label="Call Signature Sports directly"
              >
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <span>Call Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Carousel */}
      <Carousel />
    </div>
  );
};

export default ProductDetails;

