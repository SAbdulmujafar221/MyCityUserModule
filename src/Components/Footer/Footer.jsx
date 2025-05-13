import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaGooglePlus,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";

function Footer() {
  return (
    <div className="tourism-footer-wrapper">
      <div className="tourism-footer-left">
        <div className="tourism-footer-about-us">
          <div className="tourism-footer-about-title">
            <b>About Us</b>
          </div>
          <div className="tourism-footer-contact-title">
            <b>Contact Us</b>
          </div>
        </div>
        <div className="tourism-footer-quick-links">
          <div className="tourism-footer-quick-title">
            <b>Quick Links</b>
          </div>
          <p><a href="/">Home</a></p>
          <p><a href="/entertainment">Entertainment</a></p>
          <p><a href="/shopping">Shopping</a></p>
          <p><a href="/paybills">Pay Bills</a></p>
          <p><a href="/hotels">Hotels</a></p>
        </div>
      </div>

      <div className="tourism-footer-address">
        <div className="tourism-footer-address-content">
          <Phone />
          <p>+91 9876543210</p>
        </div>
        <div className="tourism-footer-address-content">
          <Mail />
          <p>Being123@gmail.com</p>
        </div>
        <div className="tourism-footer-address-content">
          <MapPin />
          <p>
            No 123, main road,<br />
            Andhra Pradesh,<br />
            600001
          </p>
        </div>
      </div>

      <div className="tourism-footer-social-links">
        <a href="[Instagram Link]" target="_blank" rel="noopener noreferrer">
          <FaInstagram style={{ width: "40px", height: "40px", color: "#666666" }} />
        </a>
        <a href="[Facebook Link]" target="_blank" rel="noopener noreferrer">
          <FaFacebook style={{ width: "40px", height: "40px", color: "#666666" }} />
        </a>
        <a href="[Google Plus Link]" target="_blank" rel="noopener noreferrer">
          <FaGooglePlus style={{ width: "40px", height: "40px", color: "#666666" }} />
        </a>
        <a href="[X/Twitter Link]" target="_blank" rel="noopener noreferrer">
          <FaTwitter style={{ width: "40px", height: "40px", color: "#666666" }} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
