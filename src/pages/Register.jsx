import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  async function register(ev) {
    ev.preventDefault();
    // Check if password is at least 8 characters long
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    // Check if password contains at least 1 letter
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain a Capital letter.");
      return;
    }

    // Check if password contains at least 1 digit
    if (!/\d/.test(password)) {
      toast.error("Password must contain a digit.");
      return;
    }

    // Check if password contains at least 1 special character
    if (!/[!@#$%^&*]/.test(password)) {
      toast.error("Password must contain a special character.");
      return;
    }
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_API_URL}/auth/register`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="form">
        <h3 className="text-center">Create Account</h3>
        <form className="loginform p-3" onSubmit={register}>
          <div>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <i
              className={`bx ${
                showPassword ? "bx-hide" : "bx-show"
              } toggle-password`}
              onClick={handleShowPassword}
            ></i>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 my-3">
              Register
            </button>
            <p className="text-center">
              Allready have an account ?
              <Link
                to="/login"
                className="text-primary text-decoration-none ms-2"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
