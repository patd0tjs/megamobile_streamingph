import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "./checkout.css";
import ContextProvider, { useAppContext } from "../context/Context";
import Assets from "./Assets";
import Constants from "./Constants";

const CheckoutOnlineBanking = (props) => {
  const getOnlineBankingPaymentDetails = props.getOnlineBankingPaymentDetails;

  const { formHeight } = useAppContext();

  const subsNameOnlineBanking = useRef("");
  const subsMobileOnlineBanking = useRef("");
  const subsEmailOnlineBanking = useRef("");
  const onlineBankingTerms = useRef(false);

  const [buttonEnable, setButtonEnable] = useState(true);
  const [errorOnlineBanking, setErrorOnlineBanking] = useState("   ");

  const handlePayment = (e) => {
    e.preventDefault();
    setErrorOnlineBanking("   ");
    if (onlineBankingTerms.current.checked) {
      getOnlineBankingPaymentDetails(
        subsNameOnlineBanking.current.value,
        subsMobileOnlineBanking.current.value,
        subsEmailOnlineBanking.current.value
      );
    } else {
      setErrorOnlineBanking(Constants.ERROR_CHECKBOX);
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    if (onlineBankingTerms.current.checked) setErrorOnlineBanking("   ");
    //LETTERS ONLY
    if (e.target.id === "onlinebanking_subs_name") {
      e.target.value = e.target.value.replace(/[^a-z ]/gi, "");
    }

    if (
      subsNameOnlineBanking.current.value !== "" &&
      subsMobileOnlineBanking.current.value.length === 11 &&
      (subsMobileOnlineBanking.current.value.startsWith("09", 0) ||
        subsMobileOnlineBanking.current.value.startsWith("08", 0)) &&
      //VALID EMAIL ONLY
      /\S+@\S+\.\S+/.test(subsEmailOnlineBanking.current.value)
    ) {
      setButtonEnable(false);
    } else if (subsMobileOnlineBanking.current.value.length > 11) {
      //11 CHARS ONLY
      e.target.value = e.target.value.slice(0, -1);
    } else {
      setButtonEnable(true);
    }
  };

  return (
    <>
      <div className="checkout-right--image-wrapper">
        <img src={Assets.DRAGONPAY_BLACK} alt="dragonpay_logo"></img>
      </div>

      <div className="checkout-form-otc" style={{ height: formHeight }}>
        <div className="form-input-wrapper">
          <label htmlFor="onlinebanking_subs_name">Name</label>
          <input
            type="text"
            id="onlinebanking_subs_name"
            maxLength={40}
            ref={subsNameOnlineBanking}
            placeholder=" Must be at least 6 characters"
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className="form-input-wrapper">
          <label htmlFor="onlinebanking_subs_mobile">Mobile Number</label>
          <input
            type="number"
            id="onlinebanking_subs_mobile"
            ref={subsMobileOnlineBanking}
            placeholder=" E.g: 09xxxxxxxxx"
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className="form-input-wrapper">
          <label htmlFor="onlinebanking_subs_email">Email Address</label>
          <input
            type="email"
            id="onlinebanking_subs_email"
            ref={subsEmailOnlineBanking}
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
            ref={onlineBankingTerms}
          />
          <small>
            I agree to the StreamingPH{" "}
            <a href={Constants.TERMS_CONDITIONS}>Terms and Conditions</a>
          </small>
        </div>
        <div className="btn-wrapper">
          <div>
            <small className="error">{errorOnlineBanking}</small>
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

export default CheckoutOnlineBanking;
