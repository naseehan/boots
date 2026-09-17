import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylePages/bestSeller/App.css";
import products from "./products";

const BestSeller = () => {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const didDrag = useRef(false);

  // 12 cards per group (6 unique shoes doubled) guarantees continuous track width on all viewports
  const cardList = [...products.shoes, ...products.shoes];

  const getTranslateX = (el) => {
    if (!el) return 0;
    const style = window.getComputedStyle(el);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41;
  };

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const track = trackRef.current;
    if (!track) return;

    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    const currentTx = getTranslateX(track);
    currentTranslate.current = currentTx;

    track.style.animationPlayState = "paused";
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const deltaX = e.clientX - startX.current;
    if (Math.abs(deltaX) > 6) {
      didDrag.current = true;
    }

    const groupWidth = group.offsetWidth || 1;
    let newTx = currentTranslate.current + deltaX;

    // Wrap smoothly within [-groupWidth, 0] bounds
    newTx = ((newTx % groupWidth) - groupWidth) % groupWidth;
    track.style.animation = "none";
    track.style.transform = `translateX(${newTx}px)`;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const groupWidth = group.offsetWidth || 1;
    let currentTx = getTranslateX(track);
    currentTx = ((currentTx % groupWidth) - groupWidth) % groupWidth;

    const progress = Math.abs(currentTx) / groupWidth;
    const duration = window.innerWidth <= 640 ? 36 : 48;
    const delay = -progress * duration;

    track.style.transform = "";
    track.style.animation = `bestsellerMarquee ${duration}s linear infinite`;
    track.style.animationDelay = `${delay}s`;
    track.style.animationPlayState = "running";
  };

  const handleCardClick = (slug) => {
    if (didDrag.current) return;
    navigate(`/products/${slug}`);
  };

  return (
    <section className="bestseller-section" aria-labelledby="bestseller-heading">
      <div className="common-container">
        <div className="cate-heading mt">
          <div>
            <h2 id="bestseller-heading" className="h1-heading">
              Our Best Sellers
            </h2>
            <p className="section-subtitle">
              Top trending athletic gear chosen by champions and fitness enthusiasts.
            </p>
          </div>
        </div>
      </div>

      {/* Seamless Continuous Carousel Track */}
      <div
        className="bestseller-slider-wrapper"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div ref={trackRef} className="bestseller-marquee-track">
          {/* Primary Group */}
          <div ref={groupRef} className="bestseller-group">
            {cardList.map((item, index) => (
              <article
                key={`best-g1-${item.id}-${index}`}
                className="bestseller-slide-card"
                onClick={() => handleCardClick(item.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(item.slug);
                  }
                }}
                aria-label={`View ${item.name}`}
              >
                <div className="bestseller-slide-img-box">
                  <img
                    src={item.image}
                    loading="eager"
                    decoding="async"
                    alt={item.name}
                    width="360"
                    height="270"
                  />
                </div>

                <div className="bestseller-slide-overlay">
                  <span className="bestseller-overlay-badge">Best Seller</span>
                  <h3 className="bestseller-overlay-title">{item.name}</h3>
                  <span className="bestseller-overlay-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <span className="bestseller-overlay-cta">View Details &rarr;</span>
                </div>
              </article>
            ))}
          </div>

          {/* Duplicate Group for Infinite Loop */}
          <div className="bestseller-group" aria-hidden="true">
            {cardList.map((item, index) => (
              <article
                key={`best-g2-${item.id}-${index}`}
                className="bestseller-slide-card"
                onClick={() => handleCardClick(item.slug)}
                role="button"
                tabIndex={-1}
              >
                <div className="bestseller-slide-img-box">
                  <img
                    src={item.image}
                    loading="eager"
                    decoding="async"
                    alt=""
                    width="360"
                    height="270"
                  />
                </div>

                <div className="bestseller-slide-overlay">
                  <span className="bestseller-overlay-badge">Best Seller</span>
                  <h3 className="bestseller-overlay-title">{item.name}</h3>
                  <span className="bestseller-overlay-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <span className="bestseller-overlay-cta">View Details &rarr;</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="bestseller-btn-row">
        <Link to="/products" className="btn-athletic btn-athletic-primary">
          Explore All Products
        </Link>
      </div>
    </section>
  );
};

export default BestSeller;

