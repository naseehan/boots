import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import styles from "./productCarousel.module.css";
import products from "./products";
import { useNavigate } from "react-router-dom";

function ProductCarousel() {
  const navigate = useNavigate();

  const handleClick = (slug) => {
    window.scrollTo(0,0)
    navigate(`/products/${slug}`);
  };

  return (
    <div>
      <h3 className="mt-5 ms-4"> You Might Also Like </h3>
      <Carousel
        height={560}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        emblaOptions={{ loop: true, align: "start" }}
        style={{ marginBottom: "3rem" }}
        // to change styles of control button (next, previous) of carousel
        classNames={{
          controls: styles.controls,
          control: styles.control,
        }}
      >
        {products.shoes.map((product) => (
          <Carousel.Slide key={product.id}>
            <div className={styles.productCard}>
              <img
                loading="lazy"
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />

              <div className={styles.productDetails}>
                <h3
                  className={`${styles.productName} color-primary weight-medium`}
                >
                  {product.name}
                </h3>
                <p className={styles.productCategory} style={{textTransform: "capitalize"}}>{product.category}</p>
                <p className={styles.productPrice}>RS. {product.price}</p>
              
<button className={styles.learnMore} onClick={() => handleClick(product.slug)}>
  <span className={styles.circle} aria-hidden="true">
  <span className={`${styles.icon} ${styles.arrow}`}></span>
  </span>
  <span className={styles.buttonText}>More Details</span>
</button>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default ProductCarousel;
