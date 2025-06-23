import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import styles from "./Gh.module.css";
import products from "./products";

function ProductCarousel() {
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
                <p className={styles.productCategory}>{product.category}</p>
                <p className={styles.productPrice}>RS. {product.price}</p>
                <button>view more</button>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default ProductCarousel;
