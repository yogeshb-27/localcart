import React from "react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import FaqSection from "../components/FaqSection";

const Home = () => {
  return (
    <div className="d-flex align-items-center justify-content-center text-center flex-column">
      <h1 className="display-1 fs-1 mb-4 pt-5 mt-lg-5 lh-base ">
        <span className="text-success">LocalCart</span>: Your Daily Source of
        <br />
        Fresh <span className="text-success">Food</span> Delivered
      </h1>
      <p>Find and buy products in your local area with ease.</p>
      <div className="d-flex mt-4">
        <Link
          to="/login"
          className="btn btn-link text-decoration-none text-dark me-lg-3"
        >
          Get Started
        </Link>
        <Link to="/products" className="btn btn-success  px-4">
          Shop Now
        </Link>
      </div>

      <Features />
      <Testimonials />
      <FaqSection />
    </div>
  );
};

export default Home;
