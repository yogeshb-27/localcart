import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  async function onSubmit(ev) {
    ev.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Reset password link sent to mail");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  }

  return (
    <>
      <div className="form text-center">
        <h3 className="fs-4">Forgot Password</h3>
        <p className="text-muted">
          Enter your mail and we will send you link to
          <br /> reset your password
        </p>
        <form className="loginform p-3" onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 my-3">
              Submit
            </button>
            <p className="">
              <Link
                to="/register"
                className="text-primary text-decoration-none ms-2"
              >
                Back to login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
