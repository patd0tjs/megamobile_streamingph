import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { useAppContext } from "../context/Context";
// import VISA from "./../assets/pro_visa.png";
import Assets from "./Assets";

const CheckoutVisa = () => {
  const {
    formHeight,
    setFormHeight,
    navHeight,
    setNavHeight,
    origin,
    vendor,
    checkoutDuration,
    checkoutType,
    checkoutPrice,
  } = useAppContext();

  const visaSubsName = useRef();
  const visaSubsMobile = useRef();
  const visaSubsEmail = useRef();

  const handlePayment = (e) => {
    e.preventDefault();
    console.log(checkoutPrice);
  };

  return (
    <>
      <div className="checkout-right--image-wrapper">
        <img src={Assets.VISA} alt="gcash_logo"></img>
      </div>
      {/* <div className="checkout-form" style={{ height: formHeight }}>
        <div className="form-input-wrapper">
          <label htmlFor="s11_subs_name">Name</label>
          <input type="text" id="s11_subs_name" ref={visaSubsName} />
        </div>
        <div className="form-input-wrapper">
          <label htmlFor="s11_subs_mobile">Mobile</label>
          <input type="text" id="s11_subs_mobile" ref={visaSubsMobile} />
        </div>
        <div className="form-input-wrapper">
          <label htmlFor="s11_subs_email">Email</label>
          <input type="text" id="s11_subs_email" ref={visaSubsEmail} />
        </div>
        <div className="btn-wrapper">
          <button
            className="btn-checkout"
            onClick={(e) => {
              handlePayment(e);
            }}
          >
            Proceed Payment
          </button>
        </div>
      </div> */}
    </>
  );
};

export default CheckoutVisa;
