import React from "react";
import "./footer_home.css";
import Constants from "./Constants";

const FooterHome = () => {
  return (
    <footer className="footer-home--container">
      <div className="footer--pptc-wrapper">
        <a href={Constants.TERMS_CONDITIONS}>Privacy Policy</a>
        <a href={Constants.TERMS_CONDITIONS}>Terms and Conditions</a>
      </div>
      <section className="footer--contact-wrapper">
        <small>
          4F PDI Bldg., 1098 Chino Roces Ave. cor Yague and Mascardo St. 1204,
          Makati, Metro Manila, Philippines
        </small>
        <small>call: 02 7623 5639</small>
        <small>&copy;Copyright 2023 Megamobile, Inc. All Rights Reserved</small>
      </section>
    </footer>
  );
};

export default FooterHome;
