import React, { useState } from "react";
import "../style/landing.css";
import LoginPopup from "../components/loginPopup";
import SignupWidget from "../components/signupPopup";

export const Landing: React.FC = () => {

  const [showPopup, setPopup] = useState(false)

  const [isSignup, setSignup] = useState(false)

  return (
    <div className="landing-page">
      <div className="container">
        <h1 className="title">Railway Reservation System</h1>
        <div className="btn-container">
          <div className="login-button" onClick={() => {setPopup(true); setSignup(false) }}>Login</div>
          <div className="signup-button" onClick={() => {setPopup(true); setSignup(true) }}>Sign Up</div>
        </div>
      </div>
      {showPopup && <div className="popup-overlay" onClick={() => setPopup(false)}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
         { isSignup ? <SignupWidget></SignupWidget> : <LoginPopup></LoginPopup> }
        </div>
        </div>}
    </div>
  );
};
