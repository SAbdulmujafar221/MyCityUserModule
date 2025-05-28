import React, { useState } from "react";
import axios from "axios";
import EmailVerification from "./EmailVerification/EmailVerification";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobilenumber, setmobilenumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleNameChange = (e, setName) => {
    let valuename = e.target.value;
    const nameRegex = /^[A-Za-z](?:[A-Za-z]*\s?[A-Za-z]*)*$/;

    valuename = valuename.replace(/^\s+/, "");
    setName(valuename);

    valuename = valuename.replace(/[^A-Za-z\s]/g, "");
    valuename = valuename.replace(/\s{2,}/g, " ");

    if (
      (nameRegex.test(valuename) || valuename === "") &&
      valuename.length <= 15
    ) {
      setName(valuename.trim());
    }
  };

  const handlePhoneChange = (phone) => {
    setmobilenumber(phone);
    const numericPhone = phone.replace(/\D/g, "");

    if (numericPhone.length < 17) {
      setPhoneError("Phone number must be at least 10 digits long.");
    } else {
      setPhoneError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidmobilenumber(mobilenumber)) {
      setPhoneError("Phone number must be 10 digits!");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    if (!isStrongPassword(password)) {
      setPasswordError("Password must be at least 8 characters ");
      return;
    }
    setPasswordError("");
    setPhoneError("");
    setNameError("");
    const numericPhone = mobilenumber.replace(/\D/g, ""); 
    const lastTenDigits = numericPhone.slice(-15);
    const payload = {
      firstname,
      lastname,
      email,
      mobilenumber ,// : lastTenDigits,
      password,
    };

    console.log("Payload:", payload);

    try {
      const response = await axios.post(
        "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/register/user",
        payload
      );
      console.log("Server response:", response);
      if (response.data.message === true) {
        alert("Registration successful!");
      } 
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response?.data?.message === "User already registered") {
        alert("User already registered. Go to login page.");
      } else {
        alert(
          
            (error.response?.data?.message || error.message)
        );
      }
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

  const isStrongPassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const isValidmobilenumber = (mobilenumber) => {
    return mobilenumber.length > 0;
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
        <div className="tourism-module-whole-container">
          <div className="tourism-module-wrap-create">
            <h2 className="tourism-module-changing-title">Create an account</h2>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p className="tourism-module-Go-Home"> Go Home</p>
            </Link>
          </div>
          <p className="tourism-module-subtitle">
            Already have an account?
            <span className="tourism-module-link">
              <a href="/Login">Login</a>
            </span>
          </p>

          <form className="tourism-module-form" onSubmit={handleRegister}>
            <div className="tourism-module-input-field">
              <input
                type="text"
                placeholder="First Name"
                className="tourism-module-input"
                value={firstname}
                onChange={(e) => handleNameChange(e, setFirstName)}
                maxLength={15}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="tourism-module-input"
                value={lastname}
                onChange={(e) => handleNameChange(e, setLastName)}
                maxLength={15}
                required
                disabled={!firstname}
              />
            </div>
            {nameError && <p className="tourism-module-error-message">{nameError}</p>}

            <div className="tourism-module-input-group">
              <EmailVerification
                email={email}
                setEmail={setEmail}
                emailVerified={emailVerified}
                setEmailVerified={setEmailVerified}
                disabled={!lastname}
              />
            </div>
            <div>
              <PhoneInput
                type="tel"
                country={"in"}
                value={mobilenumber}
                onChange={handlePhoneChange}
                required
                disabled={!email}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                placeholder="Enter Phone Number"
                className="tourism-module-phone-input"
                minLength={10}
                maxLength={15}
              />
              {phoneError && (
                <p className="tourism-module-error-message-phone">
                  {"Phone Number Must be 10 Digits"}
                </p>
              )}
            </div>
            <div className="tourism-module-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="tourism-module-input"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                disabled={!mobilenumber}
                maxLength={15}
                minLength={8}
              />
              <span
                className="tourism-module-password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? < FaEye/> : < FaEyeSlash/>}
              </span>
            </div>
            <div className="tourism-module-password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="tourism-module-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                disabled={!password}
                maxLength={15}
                minLength={8}
              />
              <span
                className="tourism-module-password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? < FaEye/> : < FaEyeSlash/>}
              </span>
            </div>
            {passwordError && (
              <p className="tourism-module-error-message">{passwordError}</p>
            )}

            <button
              type="submit"
              className="tourism-module-submit-btn"
              disabled={!confirmPassword}
            >
              Register
            </button>
            <div className="tourism-module-social-login">
              <p className="tourism-module-social-text">Or register with</p>
              <button className="tourism-module-social-btn">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="tourism-module-icon"
                />
                Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;