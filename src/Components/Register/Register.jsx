import React, { useState } from "react";
import axios from "axios";
import EmailVerification from "./EmailVerification/EmailVerification";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Register.css";
// import "./EmailVerification/email.css";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const RegisterPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

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
    setPhoneNumber(phone);
    const numericPhone = phone.replace(/\D/g, "");

    if (numericPhone.length < 13) {
      setPhoneError("Phone number must be at least 10 digits long.");
    } else {
      setPhoneError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phoneNumber)) {
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

    const payload = {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
    };

    console.log("Payload:", payload);

    try {
      const response = await axios.post(
        "https://f328-122-166-70-72.ngrok-free.app/auth/register",
        payload
      );
      console.log("Server response:", response);
      if (response.data.success) {
        alert("Registration successful!");
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response?.data?.message === "User already registered") {
        alert("User already registered. Go to login page.");
      } else {
        alert(
          "Registration failed: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
    onClose();
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

  const isValidPhoneNumber = (phoneNumber) => {
    return phoneNumber.length > 0;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        <div className="register-container">
          <div className="form-container">
            <div className="register-img">
              <img
                src="./assets/images/background.jpg"
                alt="Register"
                className="image"
              />
            </div>
            <div className="Whole-container">
              <div className="wrap-create">
                <h2 className="changing-title">Create an account</h2>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p className="Go-Home"> Go Home</p>
                </Link>
              </div>
              <p className="subtitle">
                Already have an account?
                <span className="link">
                  <a href="/Login">Login</a>
                </span>
              </p>

              <form className="form" onSubmit={handleRegister}>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input"
                    value={firstname}
                    onChange={(e) => handleNameChange(e, setFirstName)}
                    maxLength={15}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input"
                    value={lastname}
                    onChange={(e) => handleNameChange(e, setLastName)}
                    maxLength={15}
                    required
                    disabled={!firstname}
                  />
                </div>
                {nameError && <p className="error-message">{nameError}</p>}

                <div className="input-group">
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
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required
                    disabled={!email}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    placeholder="Enter Phone Number"
                    className="phone-input"
                    minLength={10}
                    maxLength={12}
                  />
                  {phoneError && (
                    <p className="error-message-phone">
                      {"Phone Number Must be 10 Digits"}
                    </p>
                  )}
                </div>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    disabled={!phoneNumber}
                    maxLength={15}
                    minLength={8}
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="password-field">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    disabled={!password}
                    maxLength={15}
                    minLength={8}
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={!confirmPassword}
                >
                  Register
                </button>
                <div className="social-login">
                  <p className="social-text">Or register with</p>
                  <button className="social-btn">
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google"
                      className="icon"
                    />
                    Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
