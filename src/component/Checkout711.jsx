import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "./checkout.css";
import ContextProvider, { useAppContext } from "../context/Context";
// import SEVEN11 from "./../assets/pro_711.png";
import Assets from "./Assets";

import Constants from "./Constants";

const Checkout711 = (props) => {
  const getOTCPaymentDetails = props.getOTCPaymentDetails;

  const { formHeight } = useAppContext();

  const subsName711 = useRef("");
  const subsMobile711 = useRef("");
  const subsEmail711 = useRef("");
  const seven11Terms = useRef(false);

  const [buttonEnable, setButtonEnable] = useState(true);
  const [error711, setError711] = useState("   ");

  const handlePayment = (e) => {
    e.preventDefault();
    setError711("   ");
    if (seven11Terms.current.checked) {
      getOTCPaymentDetails(
        subsName711.current.value,
        subsMobile711.current.value,
        subsEmail711.current.value
      );
    } else {
      setError711(Constants.ERROR_CHECKBOX);
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    if (seven11Terms.current.checked) setError711("   ");
    //LETTERS ONLY
    if (e.target.id === "711_subs_name") {
      e.target.value = e.target.value.replace(/[^a-z ]/gi, "");
    }

    if (
      subsName711.current.value !== "" &&
      subsMobile711.current.value.length === 11 &&
      (subsMobile711.current.value.startsWith("09", 0) ||
        subsMobile711.current.value.startsWith("08", 0)) &&
      //VALID EMAIL ONLY
      /\S+@\S+\.\S+/.test(subsEmail711.current.value)
    ) {
      setButtonEnable(false);
    } else if (subsMobile711.current.value.length > 11) {
      //11 CHARS ONLY
      e.target.value = e.target.value.slice(0, -1);
    } else {
      setButtonEnable(true);
    }
  };

  return (
    <>
      <div className="checkout-right--image-wrapper">
        <img src={Assets.SEVEN11} alt="gcash_logo"></img>
      </div>

      <div className="checkout-form-otc" style={{ height: formHeight }}>
        <div className="form-input-wrapper">
          <label htmlFor="711_subs_name">Name</label>
          <input
            type="text"
            id="711_subs_name"
            maxLength={40}
            ref={subsName711}
            placeholder=" Must be at least 6 characters"
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className="form-input-wrapper">
          <label htmlFor="711_subs_mobile">Mobile Number</label>
          <input
            type="number"
            id="711_subs_mobile"
            ref={subsMobile711}
            placeholder=" E.g: 09xxxxxxxxx"
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className="form-input-wrapper">
          <label htmlFor="711_subs_email">Email Address</label>
          <input
            type="email"
            id="711_subs_email"
            ref={subsEmail711}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        {/* </div> */}
        <div className="checkout--checkbox-wrapper-otc">
          <input
            className="checkout--checkbox"
            type="checkbox"
            defaultChecked={false}
            ref={seven11Terms}
          />
          <small>
            I agree to the StreamingPH{" "}
            <a href={Constants.TERMS_CONDITIONS}>Terms and Conditions</a>
          </small>
        </div>
        <div className="btn-wrapper">
          <div>
            <small className="error">{error711}</small>
          </div>
          <button
            className="btn btn-muted"
            disabled={buttonEnable}
            onClick={(e) => {
              handlePayment(e);
            }}
          >
            Proceed Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout711;
