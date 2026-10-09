import { useMemo, useState, useEffect } from "react";
import "../stylePages/productCard/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/productsApi";
import staticProducts from "./products";

const categoriesList = [
  { id: "", label: "All Products" },
  { id: "shoes", label: "Footwear" },
  { id: "sportsBalls", label: "Sports Balls" },
  { id: "racquets", label: "Racquets" },
  { id: "boardGames", label: "Board Games" },
];

function ProductCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState(location.state?.category || "");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  // API state
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchProducts()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllProducts(data);
        } else {
          const fallback = Object.entries(staticProducts).flatMap(([group, items]) =>
            items.map((it) => ({
              _id: String(it.id),
              name: it.name,
              slug: it.slug,
              price: it.price,
              category: it.category,
              productGroup: group,
              overview: it.desc,
              imageUrl: it.image,
              padding: it.padding,
            }))
          );
          setAllProducts(fallback);
        }
      })
      .catch(() => {
        const fallback = Object.entries(staticProducts).flatMap(([group, items]) =>
          items.map((it) => ({
            _id: String(it.id),
            name: it.name,
            slug: it.slug,
            price: it.price,
            category: it.category,
            productGroup: group,
            overview: it.desc,
            imageUrl: it.image,
            padding: it.padding,
          }))
        );
        setAllProducts(fallback);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (location.state?.category !== undefined) {
      setCategory(location.state.category);
      setCurrentPage(1);
    }
  }, [location.state]);

  const handleClick = (slug) => {
    navigate(`/products/${slug}`);
  };

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
    setCurrentPage(1);
  };

  // Filter flat array by productGroup (replaces the old products[category] lookup)
  const selectedProducts = useMemo(() => {
    if (!category) return allProducts;
    return allProducts.filter((p) => p.productGroup === category || p.category === category);
  }, [allProducts, category]);

  const sortedItems = useMemo(() => {
    const items = [...selectedProducts];
    if (sortValue === "low-high") return items.sort((a, b) => a.price - b.price);
    if (sortValue === "high-low") return items.sort((a, b) => b.price - a.price);
    return items;
  }, [selectedProducts, sortValue]);

  const totalProducts = sortedItems.length;
  const totalPage = Math.ceil(totalProducts / perPage) || 1;
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  const currentItems = useMemo(() => {
    const offset = (currentPage - 1) * perPage;
    return sortedItems.slice(offset, offset + perPage);
  }, [sortedItems, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPage) setCurrentPage((prev) => prev + 1);
  };

  // ── Loading skeleton ─────────────────────────────────────
  if (loading) {
    return (
      <section className="catalog-container common-container" aria-label="Product Catalog">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "320px",
            gap: "1rem",
            color: "var(--text-muted)",
          }}
          role="status"
          aria-live="polite"
        >
          <div className="spinner-athletic" />
          <p>Loading products…</p>
        </div>
      </section>
    );
  }

  // ── Error state ──────────────────────────────────────────
  if (error) {
    return (
      <section className="catalog-container common-container" aria-label="Product Catalog">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "320px",
            gap: "1rem",
            color: "var(--text-muted)",
            textAlign: "center",
          }}
          role="alert"
        >
          <p style={{ color: "var(--brand-red)" }}>⚠️ {error}</p>
          <button
            className="btn-catalog-details"
            onClick={() => {
              setLoading(true);
              setError("");
              fetchProducts()
                .then((data) => setAllProducts(Array.isArray(data) ? data : []))
                .catch((err) => setError(err.message || "Failed to load products."))
                .finally(() => setLoading(false));
            }}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="catalog-container common-container" aria-label="Product Catalog">
      {/* Filters & Sorting Bar */}
      <div className="catalog-toolbar">
        <div className="catalog-counter">
          <span>Showing</span> <strong>{currentItems.length}</strong> of <strong>{totalProducts}</strong> products
        </div>

        <div className="catalog-filter-chips" role="tablist" aria-label="Filter products by category">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={category === cat.id}
              className={`filter-chip ${category === cat.id ? "is-active" : ""}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="catalog-sort-wrapper">
          <label htmlFor="product-sort-select" className="visually-hidden">Sort Products</label>
          <select
            id="product-sort-select"
            value={sortValue}
            onChange={handleSortChange}
            className="catalog-sort-select"
          >
            <option value="">Sort by: Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      {currentItems.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            color: "var(--text-muted)",
          }}
        >
          <p>No products found in this category.</p>
        </div>
      )}

      {/* Product Cards Grid */}
      <div className="catalog-grid">
        {currentItems.map((item) => (
          <article className="catalog-card" key={item._id}>
            <div
              className="catalog-card-media"
              onClick={() => handleClick(item.slug)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(item.slug);
                }
              }}
              aria-label={`View ${item.name}`}
            >
              <span className="catalog-badge">{item.category}</span>
              <img
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
                width="280"
                height="220"
                className={item.padding ? "has-padded-img" : ""}
              />
            </div>

            <div className="catalog-card-content">
              <div className="catalog-card-header">
                <h2
                  className="catalog-card-title"
                  onClick={() => handleClick(item.slug)}
                  title={item.name}
                >
                  {item.name}
                </h2>
                <span className="catalog-card-price">₹{item.price.toLocaleString("en-IN")}</span>
              </div>

              <p className="catalog-card-desc">{item.overview}</p>

              <button
                className="btn-catalog-details"
                onClick={() => handleClick(item.slug)}
                aria-label={`View full details for ${item.name}`}
              >
                More Details
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPage > 1 && (
        <nav className="catalog-pagination" aria-label="Catalog pagination">
          <button
            className="pagination-arrow-btn"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &larr; Prev
          </button>

          <div className="pagination-numbers">
            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                className={`pagination-num-btn ${currentPage === pageNum ? "is-active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
                aria-current={currentPage === pageNum ? "page" : undefined}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            className="pagination-arrow-btn"
            onClick={handleNext}
            disabled={currentPage === totalPage}
            aria-label="Next page"
          >
            Next &rarr;
          </button>
        </nav>
      )}
    </section>
  );
}

export default ProductCard;
