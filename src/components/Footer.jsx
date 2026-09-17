import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="signature-footer" aria-label="Site Footer">
      <div className="footer-top-section">
        <div className="common-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-col footer-brand-col">
              <Link to="/" className="footer-logo-link" aria-label="Signature Sports Home">
                <img
                  src={logo}
                  alt="Signature Sports"
                  className="footer-logo"
                  width="150"
                  height="48"
                  loading="lazy"
                />
              </Link>
              <p className="footer-about-text">
                Kallambalam’s trusted sports hub for authentic footwear,
                match-grade balls, precision racquets, and premium fitness gear.
                Empowering athletes of all levels since day one.
              </p>
              <div className="footer-social-links">
                <a
                  href="https://wa.me/917034546546"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="footer-social-icon"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                </a>
                <a
                  href="https://www.google.com/maps?q=8.763724781573522,76.79233498368549"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps"
                  className="footer-social-icon"
                >
                  <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i>
                </a>
                <a
                  href="tel:+917034546546"
                  aria-label="Phone"
                  className="footer-social-icon"
                >
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h3 className="footer-heading">Quick Navigation</h3>
              <ul className="footer-links-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">All Products</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact & Store Location</Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-col">
              <h3 className="footer-heading">Shop By Category</h3>
              <ul className="footer-links-list">
                <li>
                  <Link to="/products" state={{ category: "shoes" }}>
                    Athletic Footwear
                  </Link>
                </li>
                <li>
                  <Link to="/products" state={{ category: "sportsBalls" }}>
                    Sports Balls
                  </Link>
                </li>
                <li>
                  <Link to="/products" state={{ category: "racquets" }}>
                    Racquets & Shuttles
                  </Link>
                </li>
                <li>
                  <Link to="/products" state={{ category: "boardGames" }}>
                    Board Games
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col footer-contact-col">
              <h3 className="footer-heading">Store Information</h3>
              <div className="footer-contact-items">
                <div className="footer-contact-item">
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  <span>Main Road, Kallambalam, Kerala 695605</span>
                </div>
                <div className="footer-contact-item">
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <a href="tel:+917034546546">+91 7034546546</a>
                </div>
                <div className="footer-contact-item">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  <a href="https://wa.me/917034546546" target="_blank" rel="noopener noreferrer">
                    +91 7034546546 (WhatsApp)
                  </a>
                </div>
                <div className="footer-contact-item">
                  <i className="fa-solid fa-clock" aria-hidden="true"></i>
                  <span>Mon – Sun: 9:00 AM – 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom-bar">
        <div className="common-container footer-bottom-container">
          <p className="copyright-text">
            &copy; {year} Signature Sports. All rights reserved. Premium Sports Store in Kallambalam.
          </p>
          <div className="footer-bottom-links">
            <Link to="/about">About</Link>
            <span>&bull;</span>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

