import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);

  const handleLogOut = async () => {
    try {
      logout();
      toast.success("Log out successful");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <NavLink
          className="navbar-brand fs-4 d-inline-flex align-items-center ms-5"
          to="/"
        >
          <i className="bx bxs-cart text-success me-2"></i>
          <span className="fs-5 display-1 text-success"> LocalCart</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav fs-6 ms-lg-5 ps-lg-5">
            <NavLink
              className={({ isActive }) =>
                `nav-link me-5 ps-lg-3 ${isActive ? "text-success" : ""}`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `nav-link me-5 ps-lg-3 ${isActive ? "text-success" : ""}`
              }
              to="/products"
            >
              Products
            </NavLink>

            {isAdmin && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link me-5 ps-lg-3 ${isActive ? "text-success" : ""}`
                  }
                  to="/admin/"
                >
                  Dashboard
                </NavLink>
              </>
            )}
          </div>

          <NavLink
            className={({ isActive }) =>
              `nav-link me-5 ps-lg-3 ${isActive ? "text-success" : ""}`
            }
            to="/cart"
          >
            Cart(
            {cartCount > 0 ? (
              <span className="text-success">{cartCount}</span>
            ) : (
              0
            )}
            )
          </NavLink>

          {token ? (
            <>
              <button
                className={`nav-link text-danger me-5 my-1`}
                onClick={handleLogOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `nav-link text-secondary me-5 py-1 ${
                    isActive ? "invisible" : ""
                  }`
                }
                to="/login"
              >
                LogIn
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
