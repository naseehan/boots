import { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import styles from "./productCarousel.module.css";
import { fetchProducts } from "../api/productsApi";
import staticProducts from "./products";
import { useNavigate } from "react-router-dom";

function ProductCarousel({ currentProduct }) {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetchProducts()
      .then((data) => {
        if (!isMounted) return;
        const all = Array.isArray(data) && data.length > 0
          ? data
          : Object.entries(staticProducts).flatMap(([group, items]) =>
              items.map((item) => ({ ...item, productGroup: group }))
            );

        computeRelated(all);
      })
      .catch(() => {
        if (!isMounted) return;
        const flat = Object.entries(staticProducts).flatMap(([group, items]) =>
          items.map((item) => ({ ...item, productGroup: group }))
        );
        computeRelated(flat);
      });

    function computeRelated(all) {
      if (!currentProduct) {
        setRelatedProducts(all.slice(0, 8));
        return;
      }

      // Exclude the current product being viewed
      const others = all.filter((p) => {
        if (currentProduct._id && p._id && String(p._id) === String(currentProduct._id)) {
          return false;
        }
        if (currentProduct.slug && p.slug && p.slug.toLowerCase() === currentProduct.slug.toLowerCase()) {
          return false;
        }
        if (currentProduct.id && p.id && String(p.id) === String(currentProduct.id)) {
          return false;
        }
        return true;
      });

      const curCat = currentProduct.category ? currentProduct.category.toLowerCase().trim() : "";
      const curGroup = currentProduct.productGroup ? currentProduct.productGroup.toLowerCase().trim() : "";

      // 1. Same category (e.g. football, basketball, running, etc.)
      const sameCategory = curCat
        ? others.filter((p) => p.category && p.category.toLowerCase().trim() === curCat)
        : [];

      // 2. Same product group (e.g. shoes, racquets, sportsBalls, boardGames)
      const sameGroup = curGroup
        ? others.filter((p) => {
            const pGroup = p.productGroup ? p.productGroup.toLowerCase().trim() : "";
            const pCat = p.category ? p.category.toLowerCase().trim() : "";
            return pGroup === curGroup && (!curCat || pCat !== curCat);
          })
        : [];

      // 3. Other remaining products for healthy catalog backfill
      const rest = others.filter((p) => {
        const pGroup = p.productGroup ? p.productGroup.toLowerCase().trim() : "";
        const pCat = p.category ? p.category.toLowerCase().trim() : "";
        return (!curGroup || pGroup !== curGroup) && (!curCat || pCat !== curCat);
      });

      const shuffle = (list) => [...list].sort(() => 0.5 - Math.random());

      // Combine priority: Same Category -> Same Product Group -> Catalog Backfill
      const combined = [
        ...shuffle(sameCategory),
        ...shuffle(sameGroup),
        ...shuffle(rest),
      ];

      setRelatedProducts(combined.slice(0, 8));
    }

    return () => {
      isMounted = false;
    };
  }, [currentProduct?.slug, currentProduct?._id, currentProduct?.category, currentProduct?.productGroup]);

  const handleClick = (slug) => {
    window.scrollTo(0, 0);
    navigate(`/products/${slug}`);
  };

  if (relatedProducts.length === 0) return null;

  return (
    <section className="common-container related-products-section" aria-label="Related Products">
      <div className="cate-heading mt">
        <div>
          <h2 className="h1-heading">You Might Also Like</h2>
          <p className="section-subtitle">
            Explore more athletic gear tailored to your selection.
          </p>
        </div>
      </div>

      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap="1.25rem"
        emblaOptions={{ loop: relatedProducts.length > 3, align: "start" }}
        style={{ marginBottom: "3rem" }}
        classNames={{
          controls: styles.controls,
          control: styles.control,
        }}
      >
        {relatedProducts.map((product) => (
          <Carousel.Slide key={product._id || product.id || product.slug}>
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

