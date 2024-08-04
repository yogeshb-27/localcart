import React, { useState, useEffect } from "react";
import ProductBox from "../components/ProductBox";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 8;
  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Mithai",
    "Masala",
    "Beverages",
    "Frozen",
    "Snacks",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page to 1 when searchTerm or selectedCategory changes
  }, [searchTerm, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory === "All"
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
      : product.category === selectedCategory &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="container mb-5 pb-5 position-relative">
      <div className="search my-3 pt-3 m-auto">
        <input
          className="w-100 p-1 px-3"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Products..."
        />
      </div>

      <div className="d-flex align-content-center justify-content-center mb-lg-5 my-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`btn btn-outline-white btn-sm mx-md-3 mx-1 ${
              category === selectedCategory ? "btn-success text-white" : ""
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="pt-5 mt-5 text-center text-success">
          Loading Products...
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="pt-5 mt-5 text-center ">No Products Found</p>
      ) : (
        <>
          <main className="products container mt-5">
            {currentProducts.map((product) => (
              <ProductBox key={product._id} {...product} />
            ))}
          </main>
          <div className="pagination d-flex align-items-center justify-content-center w-100">
            <button
              className={`btn btn-link text-decoration-none text-dark ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            {currentPage} / {totalPages}
            <button
              className={`btn btn-link text-decoration-none text-dark ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
