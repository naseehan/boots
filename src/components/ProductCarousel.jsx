import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import styles from "./productCarousel.module.css";
import products from "./products";
import { useNavigate } from "react-router-dom";

function ProductCarousel() {
  const navigate = useNavigate();

  const handleClick = (slug) => {
    window.scrollTo(0, 0);
    navigate(`/products/${slug}`);
  };

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
        {products.shoes.map((product) => (
          <Carousel.Slide key={product.id}>
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
                  src={product.image}
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

