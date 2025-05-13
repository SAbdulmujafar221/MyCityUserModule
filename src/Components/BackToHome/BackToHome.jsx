import React from "react";
import { useNavigate } from "react-router-dom";
import './BackToHome.css'
import { FaArrowAltCircleLeft, FaArrowCircleLeft, FaRegArrowAltCircleLeft } from "react-icons/fa";

const BackToHome = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="tourism-back-button">
  <button onClick={handleBack}> <span><FaRegArrowAltCircleLeft /></span><p> Back to Home</p></button>
</div>
  );
};

export default BackToHome;
