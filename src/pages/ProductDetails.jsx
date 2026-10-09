import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductBySlug } from "../api/productsApi";
import staticProducts from "../components/products";
import Carousel from "../components/ProductCarousel";
import "../stylePages/contactButton/App.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");

  // Helper to cleanly sanitize sizes list from any residual brackets/quotes
  const availableSizes = (product?.hasSizes && Array.isArray(product?.sizes))
    ? product.sizes
        .flatMap((s) => {
          if (typeof s === "string") {
            return s.replace(/[\[\]"'\\]/g, "").split(",");
          }
          return s;
        })
        .map((s) => String(s).trim())
        .filter(Boolean)
    : [];

  useEffect(() => {
    setLoading(true);
    fetchProductBySlug(slug)
      .then((data) => {
        if (data) {
          setProduct(data);
        } else {
          const flat = Object.values(staticProducts).flat();
          const match = flat.find((p) => p.slug === slug);
          setProduct(match || null);
        }
      })
      .catch(() => {
        const flat = Object.values(staticProducts).flat();
        const match = flat.find((p) => p.slug === slug);
        setProduct(match || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Pre-select first size when product loads or changes
  useEffect(() => {
    if (availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    } else {
      setSelectedSize("");
    }
  }, [availableSizes.length, product?.slug]);

  if (loading) {
    return (
      <div className="common-container text-center py-5" style={{ minHeight: "50vh" }}>
        <div className="spinner-athletic" style={{ margin: "2rem auto" }}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

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
    const sizeInfo = (product.hasSizes && selectedSize) ? ` (Size: ${selectedSize})` : "";
    const formattedPrice = typeof product.price === "number" ? product.price.toLocaleString("en-IN") : product.price;
    const message = encodeURIComponent(
      `Hi Signature Sports! I'm interested in purchasing "${product.name}"${sizeInfo} (Price: ₹${formattedPrice}). Is it available at your Kallambalam store?`
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
              src={product.imageUrl || product.image}
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

            {/* Selectable Sizes (if enabled) */}
            {product.hasSizes && availableSizes.length > 0 && (
              <div className="product-sizes-box" style={{ margin: "1.25rem 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <h2 className="desc-heading" style={{ fontSize: "0.95rem", margin: 0 }}>
                    Select Size:
                  </h2>
                  {selectedSize && (
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--brand-navy)" }}>
                      Selected: {selectedSize}
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }} role="radiogroup" aria-label="Available product sizes">
                  {availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        role="radio"
                        aria-checked={isSelected}
                        style={{
                          padding: "0.5rem 1rem",
                          minWidth: "48px",
                          cursor: "pointer",
                          border: isSelected ? "2px solid #ffb658" : "1.5px solid var(--border-medium)",
                          borderRadius: "var(--radius-sm)",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          background: isSelected ? "#ffb658" : "var(--bg-surface)",
                          color: isSelected ? "#0b132b" : "var(--text-primary)",
                          boxShadow: isSelected ? "0 2px 8px rgba(255, 182, 88, 0.4)" : "none",
                          transform: isSelected ? "scale(1.05)" : "scale(1)",
                          transition: "all 150ms ease",
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="product-description-box">
              <h2 className="desc-heading">Product Overview</h2>
              <p className="desc-body">{product.overview || product.desc}</p>
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

