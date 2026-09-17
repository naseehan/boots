import main1 from "../assets/main.webp";
import main2 from "../assets/main2.webp";
import "../stylePages/chooseUs/App.css";
import { Link } from "react-router-dom";

const ChooseUs = () => {
  return (
    <section className="common-container choose-us-section" aria-labelledby="why-choose-us-heading">
      <div className="choose-us-grid">
        <div className="choose-us-media-col">
          <div className="choose-us-img-frame">
            <img
              src={main1}
              alt="Athletic footwear and gear at Signature Sports"
              loading="lazy"
              width="540"
              height="600"
            />
          </div>
        </div>

        <div className="choose-us-content-col">
          <div className="choose-us-content">
            <span className="choose-us-badge">Why Signature Sports</span>
            <h2 id="why-choose-us-heading" className="choose-us-title">
              Built for Athletes, Backed by Quality
            </h2>
            <p className="choose-us-desc">
              At Signature Sports, we believe the right gear makes all the
              difference. That&apos;s why we offer top-tier sports apparel, footwear,
              and equipment from the world&apos;s most trusted brands. Whether you&apos;re
              training, competing, or staying active, our expert guidance and
              dedicated local support ensure you get the perfect fit every time.
            </p>

            <div className="choose-us-features">
              <div className="feature-pill">
                <span className="feature-icon">✓</span>
                <span>100% Genuine Brands</span>
              </div>
              <div className="feature-pill">
                <span className="feature-icon">✓</span>
                <span>Expert In-Store Fitting</span>
              </div>
              <div className="feature-pill">
                <span className="feature-icon">✓</span>
                <span>All Major Sports Covered</span>
              </div>
              <div className="feature-pill">
                <span className="feature-icon">✓</span>
                <span>Direct WhatsApp Ordering</span>
              </div>
            </div>

            <div className="choose-us-action-row">
              <Link to="/products" className="btn-athletic btn-athletic-primary">
                Shop Collections
              </Link>
            </div>

            <div className="choose-us-secondary-img">
              <img
                src={main2}
                alt="Signature Sports football gear"
                loading="lazy"
                width="480"
                height="280"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

