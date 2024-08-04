import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = cartItems.length === 0 ? 0 : subtotal > 500 ? 0 : 50;
  const orderTotal = subtotal + deliveryFee;

  return (
    <main className="container py-5">
      <h1 className="my-4 fs-3">Cart</h1>
      <hr />
      <div className="row">
        <div className="col-lg-8">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                className="d-flex align-items-center justify-content-between border-bottom py-3"
                key={item._id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "7rem", height: "5rem" }}
                  className="rounded"
                />
                <div className="flex-grow-1 ms-4">
                  <Link to={`/products/${item._id}`} className="d-block ">
                    {item.name}
                  </Link>
                  <small className="text-muted">${item.price.toFixed(2)}</small>
                </div>
                <button
                  className="btn text-danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  <i className="bx bx-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="col-lg-4">
            <h3 className="fs-4 mb-4">Order Summary</h3>
            <div className="d-flex justify-content-between my-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between my-2">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between my-2 fw-bold">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-success w-100 mt-3"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
