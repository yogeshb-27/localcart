import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const productsPerPage = 12;
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
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/");
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/admin`
        );
        setProducts(response.data);
        setTotalProducts(response.data.length);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/admin`
        );
        setProducts(response.data);
        setTotalProducts(response.data.length);
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
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
    <>
      <header>
        <h1 className="mb-3 fw-bold head">
          Hello <span className="text-success">Admin</span>
        </h1>
      </header>
      <div className="container">
        <div className="d-flex justify-content-around align-items-center py-3 ">
          <p className="text-center my-4">Total Products - {totalProducts}</p>
          <Link
            to="/admin/add-product"
            className="text-center text-danger d-block"
          >
            Add New Product
          </Link>
        </div>

        <div className="search m-auto">
          <input
            className="w-100 p-1 px-3"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        {loading ? (
          <p className="text-center mt-5 pt-5">Loading Products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center my-4">No products found.</p>
        ) : (
          <div className="table-responsive px-5 m-5">
            <table className="table table-striped">
              <thead className="px-5">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="ps-5">
                {currentProducts.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Link to={`/products/${product._id}`}>
                        {product.name}
                      </Link>
                    </td>
                    <td>{product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <Link
                        className="btn btn-sm text-primary me-2"
                        to={`/admin/update-product/${product._id}`}
                      >
                        <i className="bx bxs-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm text-danger"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <i className="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
      </div>
    </>
  );
};

export default AdminDashboard;
