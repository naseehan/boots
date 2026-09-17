import homeImg from "../assets/home-img1.webp";
import homeBg from "../assets/heroBg1.webp";
import "../stylePages/Home/App.css";
import Categories from "../components/Categories";
import MostPopular from "../components/MostPopular";
import BestSeller from "../components/BestSeller";
import ChooseUs from "../components/ChooseUs";
import InfiniteCarousel from "../components/InfiniteCarousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="hero-section" aria-label="Welcome to Signature Sports">
        <div className="hero-background-wrapper">
          <img
            src={homeBg}
            alt="Signature Sports background"
            className="hero-bg-img"
            width="1920"
            height="1080"
            loading="eager"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content-grid">
          <div className="hero-visual">
            <img
              src={homeImg}
              alt="Premium Sports Shoes and Equipment"
              className="hero-featured-img"
              width="600"
              height="600"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="hero-details">
            <div className="hero-text-card">
              <span className="hero-badge">Official Sports Store &bull; Kallambalam</span>
              <h1 className="hero-title">SIGNATURE SPORTS</h1>
              <h2 className="hero-subtitle">BEST SPORTS SHOP IN KALLAMBALAM</h2>
              <p className="hero-description">
                Browse our latest collections and find high-performance equipment
                for your athletic journey. Offering top brands in footwear,
                sports balls, racquets, and accessories for every level of play.
              </p>
              <div className="hero-cta-group">
                <Link to="/products" className="btn-hero-primary">
                  <span>View Collections</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <Link to="/about" className="btn-hero-secondary">
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Categories />
      <MostPopular />
      <BestSeller />
      <ChooseUs />
      <InfiniteCarousel />
    </>
  );
};

export default Home;

