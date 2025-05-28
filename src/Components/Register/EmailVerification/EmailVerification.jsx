import React, { useState, useEffect } from "react";
import axios from "axios";
import "./email.css";

const EmailVerification = ({
  email,
  setEmail,
  emailVerified,
  setEmailVerified,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const validateEmail = (email) => {
    // if(email>15){
    //   alert("email showld only in 15 characters")
    // }
    // const valuemailing=email.target.value;
    // if(valuemailing>15){
    //   alert("email showld only in 15 characters");
    // }

    const emailRegex =
      /^[a-zA-Z0-9](?!.*\.{2})[a-zA-Z0-9._%+-]{0,62}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const handleSendOtp = async () => {
    // if (!validateEmail(email)) {
    //   alert("Enter a valid email!");
    //   return;
    // }

    try {
      setLoading(true);
      setShowOtpInput(true);
      await axios.post(
        "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/email/request-otp",
         {email },
       { headers: { "Content-Type": "application/json" } },
      );
      alert("OTP Sent to Email!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      const response = await axios.post(
        "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/email/verify-otp",
        { email, otp }
      );
      if (response.data.otpVerified === true) {
        setEmailVerified(true);
        setShowOtpInput(false);
        setOtpError(false);
        setOtp(["", "", "", ""]);
        alert("Email Verified");
      } else {
        setOtpError(true);
        alert("Incorrect OTP");
        setOtp(["", "", "", ""]);
      }
      
    } catch (error) {
      setOtpError(true);
      alert(error.response?.data?.message || "Verification failed");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleVerifyOtp(otp.join(""));
    }
  }, [otp]);

  return (
    <div className="email-verification-container">
      <ul className="email-verification-list">
        <li>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === " " && e.preventDefault()}
            required
            maxLength={40}
            disabled={emailVerified}
            className="email-input"
          />
        </li>
        <li className="verify-button">
          {!emailVerified && !showOtpInput && validateEmail(email) && (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="verify-btn"
            >
              {loading ? "Sending..." : "Verify"}
            </button>
          )}
        </li>
      </ul>

      {showOtpInput && !emailVerified && (
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="otp-input"
            />
          ))}

          {otpError && (
            <div className="error-message">
              <span className="error-otp">❌ Incorrect OTP</span>
            </div>
          )}

          {emailVerified && <span className="verified-message">Verified</span>}
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
