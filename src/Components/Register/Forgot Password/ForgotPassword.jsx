import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpCorrect, setIsOtpCorrect] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  // const validateEmail = (e) => {
  //   const emailValue = e.target.value;
  //   setEmail(emailValue);
  //   setEmailValid(/\S+@\S+\.\S+/.test(emailValue));
  // };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setShowOtpSection(true);
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://854f-122-166-70-72.ngrok-free.app/otp/forgot-password",
        null,
        { params: { email } }
      );

      if (response.data.success) {
        setOtpSent(true);
        setMessage("OTP sent successfully!");
      } else {
        setMessage("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
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
      setEmailValid(false);
    } else {
      setEmailError("");
      setEmailValid(true);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.includes("")) {
      setMessage("Please enter all OTP digits.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://854f-122-166-70-72.ngrok-free.app/otp/verify-otp",
        null,
        { params: { email, otp: otp.join("") } }
      );

      if (response.data.success) {
        setIsOtpCorrect(false);
        setMessage("OTP verified successfully");
      } else {
        setIsOtpCorrect(true);
        setMessage("Invalid OTP. Please try again");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setIsOtpCorrect(false);
      setMessage("Unable to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    if (!isOtpCorrect) return;

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://854f-122-166-70-72.ngrok-free.app/otp/reset-password",
        null,
        {
          params: { email, otp: otp.join(""), newPassword, confirmPassword },
        }
      );

      if (response.data.success) {
        setMessage("Password reset successful");
      } else {
        setMessage("Error resetting password");
      }
    } catch (error) {
      console.error("Error resetting password", error);
      setMessage(" Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h1 className="forgot-password-h1">Forgot Password</h1>

        <div className="wrapping-email-send-otp">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={validateEmail}
              required
              className="input-field-email-otp"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div>
            {emailValid && (
              <button
                className="reset-btn-otp"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            )}
          </div>
        </div>

        {showOtpSection && (
          <>
            <div className="wrapping-otp-verifybutton">
              <div>
                <div className="otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="otp-box"
                    />
                  ))}
                </div>
              </div>
              <div>
                <button
                  className="verify-btn full-width"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </div>
            </div>
            {/* <p className="otp-label">Enter the 4-digit OTP</p> */}
          </>
        )}
        {isOtpCorrect && (
          <p className="success-message">
            OTP Verified Successfully <CheckCircle color="green" size={20} />
          </p>
        )}
        {message && <p className="message-text">{message}</p>}
        <div className="wrapping-password-container">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value.trim())}
              className="input-field-password"
              disabled={!email}
          required
              // see once  i changed    disabled={!isOtpCorrect}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
              className="input-field-confirm-password"
              disabled={!newPassword}
              required

              // see once  i changed    disabled={!isOtpCorrect}
            />
          </div>
        </div>

        <button
          className="reset-btn-pass-word"
          disabled={!isOtpCorrect || loading}
          onClick={handleResetPassword}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
