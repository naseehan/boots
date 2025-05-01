import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../stylePages/Navbar/App.css'
import logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate();

 

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
     <Link to="/">
        <img src={logo} alt="logo" className="navbar-brand " loading="lazy" title="Signature Sports"/>
      </Link>

      <button
        className="navbar-toggler menu__icon"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
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
              to="/events"
              className="nav-link"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              Products
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              to="/events"
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
