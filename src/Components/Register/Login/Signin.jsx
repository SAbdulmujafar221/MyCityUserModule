import React, { useState } from "react";
import { Link } from "react-router";
 import "../Register.css";
// import "../Register/EmailVerification/EmailVerifying/RegisterMainPage/Register.css"
const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    try {
      const response = await fetch(
        "https://f328-122-166-70-72.ngrok-free.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Sign-in successful!");
      } else {
        const errorMessage =
          data.error || "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    }
  };

  const validateEmail = (e) => {
    let emailValue = e.target.value.trim();
    emailValue = emailValue.replace(/\s/g, "");
    setEmail(emailValue);

    const emailRegex = /^[a-zA-Z0-9](?!.*\.{2})[a-zA-Z0-9._%+-]{0,62}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <div className="register-img">
          <img src="./assets/images/background.jpg" alt="Register" className="image" />
        </div>
        <div className="login-container">
          <h2 className="Signin-title">Sign In</h2>
          <p className="subtitle">
            Don't have an account?{" "}
            <span className="link">
              <a href="/register">Register</a>
            </span>
          </p>

          <form className="login-form" onSubmit={handleSignIn}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                className="input"
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
            <div className="input-group">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                className="input"
                minLength={8}
                maxLength={20}
              />
            </div>
            {error && <p className="error-message">{"invalid input"}</p>}

            <button type="submit" className="submit-btn">
              Sign In
            </button>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;