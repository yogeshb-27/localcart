import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-100 px-5 py-4 text-white position-absolute">
      <div className="d-flex justify-content-between mx-4">
        <Link to="/" className="text-white fs-5">
          <i className="bx bxs-cart text-white me-2"></i>
          Local Cart
        </Link>
        <div className="d-flex justify-justify-content-around">
          <Link to="/" className="text-white me-5">
            Home
          </Link>
          <Link to="/products" className="text-white me-5">
            Products
          </Link>
          <Link to="/#faq" className="text-white me-5">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
