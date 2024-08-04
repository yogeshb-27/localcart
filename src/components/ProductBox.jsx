import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductBox({ _id, name, image, price }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${_id}`);
  };

  const truncateName = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="product-box cursor-pointer" onClick={handleClick}>
      <div className="product-image-cover">
        <img src={image} alt={name} loading="lazy" className="img" />
      </div>
      <div className="product-info p-3 ps-0">
        <h6>{truncateName(name, 130)}</h6>
        <p>&#8377; {price.toFixed(2)}</p>
      </div>
    </div>
  );
}
