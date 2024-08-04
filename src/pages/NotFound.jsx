import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5 pt-5">
      <h1 className="pt-lg-5 mt-lg-5">404 - Not Found</h1>
      <p>Sorry, file not found. Back to the homepage.</p>
      <Link to="/" className="text-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
