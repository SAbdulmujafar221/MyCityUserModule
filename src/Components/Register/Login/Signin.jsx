import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    // Prevent caching of this page
    const meta = document.createElement("meta");
    meta.name = "cache-control";
    meta.content = "no-store, no-cache, must-revalidate, proxy-revalidate";
    document.head.appendChild(meta);

    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/check-auth",
          { withCredentials: true }
        );
        if (response.status === 200) {
          navigate("/"); // Redirect authenticated users to homepage
        }
      } catch (error) {
        console.log("User not authenticated:", error);
        // Stay on login page if not authenticated
      }
    };

    checkAuth();

    return () => {
      document.head.removeChild(meta);
    };
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9](?!.*\.{2})[a-zA-Z0-9._%+-]{0,62}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/login/user",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Store user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ message: "Login successful", email })
        );

        alert("Sign-in successful!");
        console.log("Login success, navigating...");
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (e) => {
    let emailValue = e.target.value.trim();
    emailValue = emailValue.replace(/\s/g, "");
    setEmail(emailValue);

    const emailRegex =
      /^[a-zA-Z0-9](?!.*\.{2})[a-zA-Z0-9._%+-]{0,62}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="tourism-module-register-container">
      <div className="tourism-module-form-container">
        <div className="tourism-module-register-img">
          <img
            src="./assets/images/background.jpg"
            alt="Register"
            className="tourism-module-image"
          />
        </div>
        <div className="tourism-module-login-container">
          <h2 className="tourism-module-Signin-title">Sign In</h2>
          <p className="tourism-module-subtitle">
            Don't have an account?{" "}
            <span className="tourism-module-link">
              <Link to="/Register">Register</Link>
            </span>
          </p>

          <form className="tourism-module-login-form" onSubmit={handleSignIn}>
            <div className="tourism-module-input-group">
              <input
                type="email"
                placeholder="Enter your email"
                className="tourism-module-input"
                value={email}
                onChange={validateEmail}
                required
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <div className="tourism-module-input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                className="tourism-module-input"
                minLength={8}
                maxLength={20}
              />
              <span
                className="tourism-module-show-password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {error && <p className="tourism-module-error-message">{error}</p>}

            <button
              type="submit"
              className="tourism-module-submit-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <Link
              to="/forgot-password"
              className="tourism-module-forgot-password"
            >
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;