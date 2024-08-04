import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token: resetToken } = useParams(token);
  console.log(resetToken);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  async function onSubmit(ev) {
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_API_URL}/auth/reset-password/${resetToken}`,
        { password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Password Reset Successful");
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
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="form">
        <h3 className="text-center">Reset Password</h3>
        <form className="loginform p-3" onSubmit={onSubmit}>
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
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Password"
            />
            <i
              className={`bx ${
                showPassword ? "bx-hide" : "bx-show"
              } toggle-password`}
              onClick={handleShowConfirmPassword}
            ></i>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 my-3">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
