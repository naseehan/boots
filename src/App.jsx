import { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Error = lazy(() => import("./pages/Error"));

// Admin routes
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminProducts = lazy(() => import("./admin/AdminProducts"));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, []);

  return (
    <div className="app-layout">
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <ScrollToTop />}
      <main id="main-content" tabIndex="-1">
        <Suspense
          fallback={
            <div className="page-loading-skeleton" role="status" aria-live="polite">
              <div className="spinner-athletic"></div>
              <p>Loading Signature Sports...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminProducts />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;

