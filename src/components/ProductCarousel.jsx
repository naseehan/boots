import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import styles from "./productCarousel.module.css";
import { fetchProducts } from "../api/productsApi";
import staticProducts from "./products";
import { useNavigate } from "react-router-dom";

function ProductCarousel() {
  const navigate = useNavigate();
  const [shoes, setShoes] = useState(staticProducts.shoes);

  useEffect(() => {
    fetchProducts({ group: "shoes" })
      .then((data) => {
        const list = Array.isArray(data) && data.length > 0 ? data : staticProducts.shoes;
        setShoes(list);
      })
      .catch(() => setShoes(staticProducts.shoes));
  }, []);

  const handleClick = (slug) => {
    window.scrollTo(0, 0);
    navigate(`/products/${slug}`);
  };

  if (shoes.length === 0) return null;

  return (
    <section className="common-container related-products-section" aria-label="Related Products">
      <div className="cate-heading mt">
        <div>
          <h2 className="h1-heading">You Might Also Like</h2>
          <p className="section-subtitle">
            Explore more popular athletic gear from our collection.
          </p>
        </div>
      </div>

      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap="1.25rem"
        emblaOptions={{ loop: true, align: "start" }}
        style={{ marginBottom: "3rem" }}
        classNames={{
          controls: styles.controls,
          control: styles.control,
        }}
      >
        {shoes.map((product) => (
          <Carousel.Slide key={product._id || product.id}>
            <article className={styles.productCard}>
              <div
                className={styles.imageWrapper}
                onClick={() => handleClick(product.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick(product.slug);
                  }
                }}
                aria-label={`View ${product.name}`}
              >
                <img
                  loading="lazy"
                  src={product.imageUrl || product.image}
                  alt={product.name}
                  className={styles.productImage}
                  width="260"
                  height="200"
                />
              </div>

              <div className={styles.productDetails}>
                <span className={styles.productCategory}>{product.category}</span>
                <h3
                  className={styles.productName}
                  onClick={() => handleClick(product.slug)}
                >
                  {product.name}
                </h3>
                <div className={styles.productPrice}>₹{product.price.toLocaleString("en-IN")}</div>

                <button
                  className={styles.viewDetailsBtn}
                  onClick={() => handleClick(product.slug)}
                  aria-label={`View details for ${product.name}`}
                >
                  View Details
                </button>
              </div>
            </article>
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
}

export default ProductCarousel;

