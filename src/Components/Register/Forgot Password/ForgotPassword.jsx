import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const [emailMessage, setEmailMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

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

  const handleVerifyEmailAndSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailMessage("");

    try {
      const verifyResponse = await axios.post(
        "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/forgotpassword/initiate",
        { email },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (
        verifyResponse.status !== 200 ||
        (verifyResponse.data.success === false || verifyResponse.data.emailExists === false)
      ) {
        setEmailMessage("Email is not registered.");
        setLoading(false);
        return;
      }

      const otpResponse = await axios.post(
        "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/email/request-otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
          }
        }
      );

      if (otpResponse.status === 200) {
        setOtpSent(true);
        setShowOtpSection(true);
        setEmailMessage("OTP sent successfully!");
      } else {
        setEmailMessage("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error verifying email or sending OTP:", error);
      setEmailMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
      setOtpMessage("Please enter all OTP digits.");
      return;
    }

    setLoading(true);
    setOtpMessage("");

    try {
      const otpString = otp.join("");

      const response = await axios.post(
        "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/email/verify-otp",
        { email, otp: otpString },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setIsOtpCorrect(true);
        setOtpMessage("OTP verified successfully");
      } else {
        setIsOtpCorrect(false);
        setOtpMessage("Invalid OTP. Please try again");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setIsOtpCorrect(false);
      setOtpMessage("Unable to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!isOtpCorrect) return;

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setPasswordMessage("");

    try {
      const response = await axios.post(
        "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/forgotpassword/reset",
        { email ,newPassword },
        { headers: { "Content-Type": "application/json" } },
      );

      if (response.status === 200) {
        setPasswordMessage("Password reset successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Navigate to login after 2 seconds
      } else {
        setPasswordMessage("Error resetting password");
      }
    } catch (error) {
      console.error("Error resetting password", error);
      setPasswordMessage("Unable to reset password");
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
            {emailError && <p className="email-error">{emailError}</p>}
            {emailMessage && (
              <p className={emailMessage.includes("success") ? "success-message" : "error-message"}>
                {emailMessage}
              </p>
            )}
          </div>
          <div>
            {emailValid && (
              <button
                className="reset-btn-otp"
                onClick={handleVerifyEmailAndSendOtp}
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
                {otpMessage && (
                  <p className={otpMessage.includes("success") ? "success-message" : "error-message"}>
                    {otpMessage} {otpMessage.includes("success") && <CheckCircle color="green" size={20} />}
                  </p>
                )}
              </div>
              <div>
                <button
                  className="verify-btn full-width"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </>
        )}

        <div className="wrapping-password-container">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value.trim())}
              className="input-field-password"
              disabled={!isOtpCorrect}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
              className="input-field-confirm-password"
              disabled={!isOtpCorrect || !newPassword}
              required
            />
          </div>
          {passwordMessage && (
            <p className={passwordMessage.includes("success") ? "success-message" : "error-message"}>
              {passwordMessage} {passwordMessage.includes("success") && <CheckCircle color="green" size={20} />}
            </p>
          )}
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