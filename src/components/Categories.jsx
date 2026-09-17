import data from "./CatesData";
import "../stylePages/Categories/App.css";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate("/products", { state: { category: categoryName } });
  };

  const handleKeyDown = (e, categoryName) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(categoryName);
    }
  };

  return (
    <section className="common-container categories-section" aria-labelledby="categories-heading">
      <div className="cate-heading mt">
        <div>
          <h2 id="categories-heading" className="h1-heading">
            Our Categories
          </h2>
          <p className="section-subtitle">
            Explore curated gear built for maximum performance across every sport.
          </p>
        </div>
      </div>
      <div className="cates mts">
        {data.map((cat, index) => (
          <article
            className="each-cates"
            key={index}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(cat.category)}
            onKeyDown={(e) => handleKeyDown(e, cat.category)}
            aria-label={`Browse ${cat.name} category`}
          >
            <div className="category-img-container">
              <img
                src={cat.img}
                alt={cat.name}
                loading="lazy"
                width="320"
                height="240"
              />
            </div>
            <div className="category-card-content">
              <h3 className="category-title">{cat.name}</h3>
              <span className="category-action-link">
                Explore Range
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Categories;

