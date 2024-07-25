import React from "react";
import "./footer_logo.css";
import Assets from "./Assets";

const FooterLogo = () => {
  return (
    <footer className="footer-logo-container">
      <small className="font-primary-italic">Pay with</small>
      <div className="footer-container--image-wrapper">
        <div>
          <img src={Assets.MAYA} alt="maya-logo" />
        </div>
        <div>
          <img src={Assets.GCASH} alt="gcash-logo" />
        </div>
        <div>
          <img src={Assets.SEVEN11} alt="seven11-logo" />
        </div>
        <div>
          <img src={Assets.VISA} alt="visa-logo" />
        </div>
        <div>
          <img src={Assets.DRAGONPAY} alt="dragonpay-logo" />
        </div>
      </div>
    </footer>
  );
};

export default FooterLogo;
