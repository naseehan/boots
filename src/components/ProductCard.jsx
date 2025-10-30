import  { useMemo, useState } from "react";
import styled from "styled-components";
import products from "./products";
import "../stylePages/productCard/App.css";
import { useLocation, useNavigate } from "react-router-dom";

const Button = styled.button`
  padding: 0.6rem 0.75rem;
  margin-top: auto;
  &:hover {
    color: #fff;
    background: linear-gradient(to right, #3e5068, #0c1970);
  }
`;
const CardBody = styled.div`
  display: grid;
  gap: 1.4rem;
  padding: 1.3rem;
  box-shadow: var(--shadow-s);
  background-color: var(--bg-light);
  height: 18rem;
`;
const ProductBody = styled.div`
  width: 20rem;
  border-radius: 1rem;
  transition: all 0.3s;
  box-shadow: 0 0 #0000, 0 0 #000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: rgb(255 255 255 / 1);

  img {
    transition: all 0.3s;
  }
  &:hover img {
    transform: scale(1.3);
  }
`;

const Text = styled.p`
  font-weight: 700;
  font-family: "Afacad Flux", sans-serif;
  font-size: 26px;
`;
const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: clip;
`;
const Select = styled.select`
  &:focus-visible {
    outline: none;
  }
`;

function Card2() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.state?.category || "";

  const handleClick = (slug) => {
    navigate(`/products/${slug}`);
  };

  // for sorting by price and category
  const [sortValue, setSortValue] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentPage(1); // reset to page 1
  };

  const handleChange = (e) => {
    setSortValue(e.target.value);
    setCurrentPage(1);
  };

  // sorting by price && sorting by category

  const selectedProducts =
    category && products[category]
      ? products[category]
      : Object.values(products).flat();

  const sortedItems = useMemo(() => {
    const items = [...selectedProducts];
    if (sortValue === "low-high")
      return items.sort((a, b) => a.price - b.price);
    if (sortValue === "high-low")
      return items.sort((a, b) => b.price - a.price);
    return items;
  }, [selectedProducts, sortValue]);

  // for pagination
  const totalProducts = sortedItems.length;

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const totalPage = Math.ceil(totalProducts / perPage);
  const pageNumber = Array.from({ length: totalPage }, (_, i) => i + 1);

  
  const currentItems = useMemo(() => {
    const offset = (currentPage - 1) * perPage;
    return sortedItems.slice(offset, offset + perPage);
  }, [sortedItems, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // clicking next button
  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  //  clicking page number
  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="position-relative d-grid">
        <div className="d-flex justify-content-around align-items-center category-manuel-styles">
          <p style={{ color: "#9DB2BF" }}>
            Showing {currentItems.length} of {totalProducts}
          </p>
          <div className="d-flex gap-3 flex-wrap mx-3 cate-nav-buttons">
            <button onClick={() => handleCategoryChange("")}>
              <span className="button_top"> All Products </span>
            </button>
            <button onClick={() => handleCategoryChange("shoes")}>
              <span className="button_top"> Shoes </span>
            </button>
            <button onClick={() => handleCategoryChange("sportsBalls")}>
              <span className="button_top"> Sports Balls </span>
            </button>
            <button onClick={() => handleCategoryChange("boardGames")}>
              <span className="button_top"> Board Games </span>
            </button>
            <button onClick={() => handleCategoryChange("racquets")}>
              <span className="button_top"> Racquet </span>
            </button>
          </div>
          <div>
            <Select
              name="sort"
              id="sort"
              onChange={handleChange}
              defaultValue=""
              className="form-select cursor-pointer"
            >
              <option value="" disabled hidden>
                Sort By
              </option>
              <option value="high-low">Price : High-Low</option>
              <option value="low-high">Price : Low-High</option>
            </Select>
          </div>
        </div>

        <div className="container-fluid  d-flex flex-wrap gap-4 justify-content-center my-5 ">
          {currentItems.map((data) => (
            <ProductBody key={data.id} className="">
              <div className="position-relative" style={{ height: "14rem" }}>
                <img
                  loading="lazy"
                  src={data.image}
                  className="card-img-top object-fit-contain"
                  alt="shoes"
                  style={{
                    height: "100%",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                    padding: data.padding ? "35px" : "0",
                  }}
                />
              </div>
              <CardBody className="">
                <div className="d-flex justify-content-between mb-2">
                  <Text
                    className="card-title mb-0 fw-bold"
                    style={{ maxWidth: "20ch" }}
                  >
                    {data.name}
                  </Text>
                  <span
                    className="fw-semibold"
                    style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  >
                    ₹{data.price}
                  </span>
                </div>
                <Desc className="card-text small text-black">{data.desc}</Desc>
                <Button
                  className="btn w-100 "
                  style={{
                    backgroundColor: "#858585",
                    fontWeight: "700",
                    fontSize: "18px",
                    transition: "background 0.3s ease",
                    color: "#fff",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                  }}
                  onClick={() => handleClick(data.slug)}
                >
                  More Details
                </Button>
              </CardBody>
            </ProductBody>
          ))}
        </div>

        {/* pagination */}
        <div className="pagination">
          <button
            className="paginationButton"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            ⬅️
          </button>
          {pageNumber.map((pageNum) => (
            <button
              className={`paginationButton ${
                currentPage === pageNum ? "active " : ""
              }`}
              key={pageNum}
              onClick={() => handlePageNumberClick(pageNum)}
            >
              {pageNum}
            </button>
          ))}
          <button
            className="paginationButton"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card2;
