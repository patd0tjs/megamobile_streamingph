import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { useAppContext } from "../context/Context";
// import GCASH from "./../assets/pro_gcash.png";
import Assets from "./Assets";

import Constants from "./Constants";
// import Axios from "axios";
// import EP from "./Endpoint";
// import { type } from "@testing-library/user-event/dist/type";

const CheckoutGCash = (props) => {
  const getGCashPaymentDetails = props.getGCashPaymentDetails;

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

  const [buttonEnable, setButtonEnable] = useState(true);
  const [errorGC, setErrorGC] = useState("   ");

  const gcAcctNo = useRef("");
  const subsName = useRef("");
  const subsMobile = useRef("");
  const subsEmail = useRef("");
  const gcTerms = useRef(false);
  // const errorGC = useRef("");

  const handlePayment = (e) => {
    e.preventDefault();
    setErrorGC("   ");
    if (gcTerms.current.checked) {
      getGCashPaymentDetails(
        subsName.current.value,
        subsMobile.current.value,
        subsEmail.current.value,
        gcAcctNo.current.value
      );
    } else {
      setErrorGC(Constants.ERROR_CHECKBOX);
    }
    //

    // toggleShow();
    // return;
    // setButtonEnable(false);
    // requestPayment();
  };

  /** Allowing: Integers | Backspace | Tab | Delete | Left & Right arrow keys **/
  function checkIfNumber(event) {
    const regex = new RegExp(
      /(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/
    );
    return !event.key.match(regex) && event.preventDefault();
  }

  const handleOnChange = (e) => {
    e.preventDefault();

    if (gcTerms.current.checked) setErrorGC("   ");
    //
    //LETTERS ONLY
    if (e.target.id === "gc_subs_name") {
      e.target.value = e.target.value.replace(/[^a-z ]/gi, "");
    }

    if (
      subsName.current.value !== "" &&
      subsName.current.value.length >= 6 &&
      gcAcctNo.current.value.length === 11 &&
      (gcAcctNo.current.value.startsWith("09", 0) ||
        gcAcctNo.current.value.startsWith("08", 0)) &&
      subsMobile.current.value.length === 11 &&
      (subsMobile.current.value.startsWith("09", 0) ||
        subsMobile.current.value.startsWith("08", 0)) &&
      //VALID EMAIL ONLY
      /\S+@\S+\.\S+/.test(subsEmail.current.value)
    ) {
      setButtonEnable(false);
    } else if (
      subsMobile.current.value.length > 11 ||
      gcAcctNo.current.value.length > 11
    ) {
      //11 CHARS ONLY
      e.target.value = e.target.value.slice(0, -1);
    } else {
      setButtonEnable(true);
    }
  };

  // const requestPayment = () => {
  //   Axios.post(EP.PAY_REQUEST_ONLINE, {
  //     name: subsName.current.value,
  //     mobile: subsMobile.current.value,
  //     email: subsEmail.current.value,
  //     acctNo: gcAcctNo.current.value,
  //     processor: "GCSH",
  //     provider: vendor,
  //     planDuration: checkoutDuration,
  //     planType: checkoutType,
  //     amount: checkoutPrice,
  //   })
  //     .then((res) => {
  //       // console.log("PaymentReqData " + JSON.stringify(res.data));
  //       if (res.data.status === "ok") {
  //         if (res.data.redirect === "true")
  //           window.location.replace(res.data.url);
  //         // else console.log("PaymentReqDataNONE");
  //       }
  //     })
  //     .catch((e) => {
  //       console.log("PaymentReqError" + e);
  //     });
  // };

  return (
    <>
      <div className="checkout-right--image-wrapper">
        <img src={Assets.GCASH} alt="gcash_logo"></img>
        {/* <small>TEST</small> */}
      </div>
      <div className="checkout-form" style={{ height: formHeight }}>
        <div className="form-input-wrapper">
          <label htmlFor="gc_subs_name">Name</label>
          <input
            type="text"
            id="gc_subs_name"
            maxLength={40}
            placeholder=" Must be at least 6 characters"
            ref={subsName}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className="form-input-wrapper">
          <label htmlFor="gc_acct_number">GCash Account Number</label>
          <input
            type="number"
            id="gc_acct_number"
            ref={gcAcctNo}
            placeholder=" E.g: 09xxxxxxxxx"
            onKeyDown={(event) => checkIfNumber(event)}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className="form-input-dual-wrapper">
          <div className="form-input-wrapper">
            <label htmlFor="gc_subs_mobile">Mobile Number</label>
            <input
              type="number"
              id="gc_subs_mobile"
              placeholder=" E.g: 09xxxxxxxxx"
              ref={subsMobile}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className="form-input-wrapper">
            <label htmlFor="gc_subs_email">Email Address</label>
            <input
              type="email"
              id="gc_subs_email"
              ref={subsEmail}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
        </div>
        {/* <div className="btn-wrapper btn-payment "> */}
        <div className="checkout--checkbox-wrapper">
          <input
            className="checkout--checkbox"
            type="checkbox"
            defaultChecked={false}
            ref={gcTerms}
          />
          <small>
            I agree to the StreamingPH{" "}
            <a href={Constants.TERMS_CONDITIONS}>
              Terms and Conditions
            </a>
          </small>
        </div>
        <div className="btn-wrapper">
          <div>
            <small className="error">{errorGC}</small>
          </div>
          <button
            // className="btn-checkout"
            className="btn btn-muted"
            onClick={(e) => {
              handlePayment(e);
            }}
            disabled={buttonEnable}
          >
            Proceed Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutGCash;
