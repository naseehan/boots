import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Navbar = () => {

  useEffect(() => {

  
    const navLinks = document.querySelectorAll(".nav-link");
    const collapseElement = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (collapseElement.classList.contains("show")) {
          new bootstrap.Collapse(collapseElement).hide();
        }
      });
    });

    // Cleanup
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", () => {});
      });
    };
  }, []);


  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top navbar-for-other-pages"
    >
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="navbar-brand"
          loading="lazy"
          title="Signature Sports"
        />
      </Link>

      <button
        className="navbar-toggler menu__icon"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        {/* <span className="navbar-toggler-icon"></span> */}
      </button>

      <div
        className="collapse navbar-collapse div-own-styles"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav  navbar-own-styles">
          <li className="nav-item active">
            <Link
              to="/"
              className="nav-link"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              to="/products"
              className="nav-link"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              Products
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              to="/about"
              className="nav-link"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              About
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              to="/contact"
              className="nav-link"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              Contact US
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
