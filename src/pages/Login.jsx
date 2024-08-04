import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
export default function Login() {
  const { token, login, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products");
    }
  }, [token, navigate]);

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        await login(response.data.token);
        if (response.data?.role == "admin") {
          localStorage.setItem("isAdmin", JSON.stringify(true));
          setIsAdmin(true);
          navigate("/admin/");
        } else {
          navigate("/products");
        }
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error during login:", error);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="form">
        <h3 className="text-center">Log In</h3>
        <form className="loginform p-3 " onSubmit={loginUser}>
          <div>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
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
          <Link
            to="/forgot-password"
            className="text-primary text-decoration-none ms-2"
          >
            <small> Forgot Password ?</small>
          </Link>
          <div>
            <button type="submit" className="btn btn-primary w-100 my-3">
              Log In
            </button>
            <p className="text-center">
              Don't have an account ?
              <Link
                to="/register"
                className="text-primary text-decoration-none ms-2"
              >
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
