import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";
import "../stylePages/Navbar/App.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navClass = `signature-navbar ${
    isHome
      ? isScrolled
        ? "navbar-scrolled"
        : "navbar-transparent"
      : "navbar-solid"
  }`;

  return (
    <header className={navClass}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand-link" aria-label="Signature Sports Home">
          <img
            src={logo}
            alt="Signature Sports Logo"
            className="navbar-logo"
            width="140"
            height="44"
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className={`navbar-toggle-btn ${isMenuOpen ? "is-active" : ""}`}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="primary-navigation"
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>

        {/* Navigation Links */}
        <nav
          id="primary-navigation"
          className={`navbar-menu ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Main Navigation"
        >
          <ul className="navbar-nav-list">
            <li className="navbar-nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? "active" : ""}`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li className="navbar-nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? "active" : ""}`
                }
              >
                Products
              </NavLink>
            </li>
            <li className="navbar-nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? "active" : ""}`
                }
              >
                About
              </NavLink>
            </li>
            <li className="navbar-nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? "active" : ""}`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className="navbar-cta-wrapper">
            <Link
              to="/products"
              className="navbar-cta-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop Now
            </Link>
          </div>
        </nav>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="navbar-backdrop"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;

