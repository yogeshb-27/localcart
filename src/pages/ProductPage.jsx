import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart, isProductInCart } =
    useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        setProductInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(productInfo);
    toast.success("Product added to cart!");
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productInfo._id); // Use _id instead of id
    toast.success("Product removed from cart!");
  };

  if (loading) {
    return <p className="text-center mt-5 pt-5">Loading...</p>;
  }

  if (!productInfo) {
    return <p className="text-center mt-5 pt-5">Product not found.</p>;
  }

  return (
    <main className="container py-lg-5">
      <Link to={"/products"} className="ms-5 mb-4 ps-5">
        Back
      </Link>
      <div className="row">
        <div className="col-lg-6 p-3">
          <div className="cover-image">
            <img
              src={productInfo.image}
              alt={productInfo.name}
              id="dropzoneimage"
              loading="lazy"
            />
          </div>
        </div>
        <div className="col-lg-6 p-3">
          <small className="text-success fs-6 me-3">
            {productInfo.category}
          </small>
          <h1 className="h2 fs-3  ls-1">{productInfo.name}</h1>
          <small className="text-muted fs-6">{productInfo.quantity}</small>
          <h3 className="my-2 ls-1 fs-5">&#8377; {productInfo.price}</h3>
          <section className="description mt-3">
            <h5 className="section-head fw-medium">About Product</h5>
            <div
              dangerouslySetInnerHTML={{ __html: productInfo.description }}
            />
          </section>
          <hr />
          <div className="d-flex justify-content-start">
            {!isProductInCart(productInfo._id) ? (
              <button
                className="btn btn-success w-50"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className="btn text-danger w-50"
                onClick={handleRemoveFromCart}
              >
                Remove from Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
