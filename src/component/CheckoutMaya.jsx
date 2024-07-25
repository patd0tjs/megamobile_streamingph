import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { useAppContext } from "../context/Context";
// import MAYA from "./../assets/pro_maya.png";
import Assets from "./Assets";

import Constants from "./Constants";

// import Axios from "axios";
// import EP from "./Endpoint";

const CheckoutMaya = (props) => {
  const getMayaPaymentDetails = props.getMayaPaymentDetails;

  const {
    formHeight,
    // setFormHeight,
    // navHeight,
    // setNavHeight,
    // origin,
    // vendor,
    // checkoutDuration,
    // checkoutType,
    // checkoutPrice,
  } = useAppContext();

  const mayaAcctNo = useRef("");
  const mayaSubsName = useRef("");
  const mayaSubsMobile = useRef("");
  const mayaSubsEmail = useRef("");
  const mayaTerms = useRef(false);

  const [buttonEnable, setButtonEnable] = useState(true);
  const [errorMaya, setErrorMaya] = useState("   ");

  // const handlePayment = (e) => {
  //   e.preventDefault();
  //   if (!hasRequestPayment.current.value) {
  //     requestPayment();
  //   }
  // };

  const handlePayment = (e) => {
    e.preventDefault();
    setErrorMaya("   ");
    if (mayaTerms.current.checked) {
      getMayaPaymentDetails(
        mayaSubsName.current.value,
        mayaSubsMobile.current.value,
        mayaSubsEmail.current.value,
        mayaAcctNo.current.value
      );
    } else {
      setErrorMaya(Constants.ERROR_CHECKBOX);
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();

    if (mayaTerms.current.checked) setErrorMaya("   ");
    //LETTERS ONLY
    if (e.target.id === "maya_subs_name") {
      e.target.value = e.target.value.replace(/[^a-z ]/gi, "");
    }

    if (
      mayaSubsName.current.value !== "" &&
      mayaAcctNo.current.value.length === 11 &&
      (mayaAcctNo.current.value.startsWith("09", 0) ||
        mayaAcctNo.current.value.startsWith("08", 0)) &&
      mayaSubsMobile.current.value.length === 11 &&
      (mayaSubsMobile.current.value.startsWith("09", 0) ||
        mayaSubsMobile.current.value.startsWith("08", 0)) &&
      //VALID EMAIL ONLY
      /\S+@\S+\.\S+/.test(mayaSubsEmail.current.value)
    ) {
      setButtonEnable(false);
    } else if (
      mayaSubsMobile.current.value.length > 11 ||
      mayaAcctNo.current.value.length > 11
    ) {
      //11 CHARS ONLY
      e.target.value = e.target.value.slice(0, -1);
    } else {
      setButtonEnable(true);
    }
  };

  return (
    <>
      <div className="checkout-right--image-wrapper">
        <img src={Assets.MAYA} alt="maya_logo"></img>
      </div>
      <div className="checkout-form" style={{ height: formHeight }}>
        <div className="form-input-wrapper">
          <label htmlFor="maya_subs_name">Name</label>
          <input
            type="text"
            id="maya_subs_name"
            maxLength={40}
            ref={mayaSubsName}
            placeholder=" Must be at least 6 characters"
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className="form-input-wrapper">
          <label htmlFor="maya_acct_number">Maya Account Number</label>
          <input
            type="number"
            id="maya_acct_number"
            ref={mayaAcctNo}
            placeholder=" E.g: 09xxxxxxxxx"
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className="form-input-dual-wrapper">
          <div className="form-input-wrapper">
            <label htmlFor="maya_subs_mobile">Mobile Number</label>
            <input
              type="number"
              id="maya_subs_mobile"
              ref={mayaSubsMobile}
              placeholder=" E.g: 09xxxxxxxxx"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className="form-input-wrapper">
            <label htmlFor="maya_subs_email">Email Address</label>
            <input
              type="email"
              id="maya_subs_email"
              ref={mayaSubsEmail}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
        </div>
        <div className="checkout--checkbox-wrapper">
          <input
            className="checkout--checkbox"
            type="checkbox"
            defaultChecked={false}
            ref={mayaTerms}
          />
          <small>
            I agree to the StreamingPH{" "}
            <a href={Constants.TERMS_CONDITIONS}>Terms and Conditions</a>
          </small>
        </div>
        <div className="btn-wrapper">
          <div>
            <small className="error">{errorMaya}</small>
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

export default CheckoutMaya;
