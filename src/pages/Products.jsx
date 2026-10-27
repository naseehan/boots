import ProductCard from "../components/ProductCard";
import usePageMeta from "../usePageMeta";
import { pageMeta } from "../seo";

const Products = () => {
  usePageMeta(pageMeta("/products"));

  return (
    <div className="products-page-container">
      <div className="common-container text-center py-4">
        <span className="badge-sports mb-2">Signature Sports Catalog</span>
        <h1 className="h1-heading mt-2">
          Gear Built For Champions
        </h1>
        <p className="section-subtitle mx-auto">
          Discover our curated selection of high-performance footwear, sports balls,
          racquets, and indoor games crafted to maximize your athletic potential.
        </p>
      </div>
      <ProductCard />
    </div>
  );
};

export default Products;

