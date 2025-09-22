import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomeNavbar from "./components/HomeNavbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {

const location = useLocation()
const isHome = location.pathname === '/'
  // going back to the specific container in the previous webpage if clicked on a button
  // and goes to another page

useEffect(() => {


if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto'; // 
}

},[])

  return (
    <div>
      {isHome ? <HomeNavbar /> : <Navbar />}
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
