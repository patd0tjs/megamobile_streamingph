import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./checkout.css";
import { useAppContext } from "../context/Context";
import CheckoutGCash from "./CheckoutGCash";
import Checkout711 from "./Checkout711";
import CheckoutMaya from "./CheckoutMaya";
import CheckoutVisa from "./CheckoutVisa";
import CheckoutOnlineBanking from "./CheckoutOnlineBanking";
import EP from "./Endpoint";
import Assets from "./Assets";
import Axios from "axios";

import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const Validation = (callback = () => {}) => {
  const hasBeenCalled = useRef();
  if (hasBeenCalled.current) return;
  callback();
  hasBeenCalled.current = true;
};

const Checkout = () => {
  const bgOpaque = true;
  const navigate = useNavigate();
  const {
    formHeight,
    setFormHeight,
    navHeight,
    origin,
    vendor,
    vendorImage,
    checkoutDuration,
    checkoutType,
    checkoutPrice,
  } = useAppContext();

  const [paymentType, setPaymentType] = useState();
  const [show, setShow] = useState(false);
  const [hasVendor, setHasVendor] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isCheckoutPriceMin50, setCheckoutPriceMin50] = useState(
    "payment-method-item item-disable"
  );

  const subsNameGC = useRef();
  const subsMobileGC = useRef();
  const subsEmailGC = useRef();
  const subsAcctNoGC = useRef();

  const subsNameMaya = useRef();
  const subsMobileMaya = useRef();
  const subsEmailMaya = useRef();
  const subsAcctNoMaya = useRef();

  const subsName711 = useRef();
  const subsMobile711 = useRef();
  const subsEmail711 = useRef();

  const subsNameOnlineBanking = useRef();
  const subsMobileOnlineBanking = useRef();
  const subsEmailOnlineBanking = useRef();
  const hasRequestPayment = useRef(false);

  const handleBackAction = () => {
    navigate(`/${origin}`, {
      state: {
        vendor: vendor,
      },
    });
  };

  useEffect(() => {
    checkPriceMin50();
    if (!hasVendor) navigate("/", {});
    else {
      setFormHeight(document.getElementById("section-left").clientHeight);
    }
  });
  const displaySpecificPayment = () => {
    switch (paymentType) {
      case "gcash":
        return (
          <CheckoutGCash getGCashPaymentDetails={getGCashPaymentDetails} />
        );
      case "maya":
        return <CheckoutMaya getMayaPaymentDetails={getMayaPaymentDetails} />;
      case "seven11":
        return <Checkout711 getOTCPaymentDetails={getOTCPaymentDetails} />;
      case "visa":
        return <CheckoutVisa />;

      case "dragonpay":
        return (
          <CheckoutOnlineBanking
            getOnlineBankingPaymentDetails={getOnlineBankingPaymentDetails}
          />
        );
      default:
        return <></>;
    }
  };

  const toggleShow = () => {
    setShowModal(!showModal); //toggle
  };

  const handlePaymentMethod = (e) => {
    e.preventDefault();
    setPaymentType(e.currentTarget.id);
    setShow(true);
  };

  //Check Validation when Refresh
  Validation(() => {
    if (!vendor) setHasVendor(false);
  });

  const checkPriceMin50 = () => {
    if (checkoutPrice !== "") {
      if (parseInt(checkoutPrice.substring(4)) >= 50) {
        setCheckoutPriceMin50("payment-method-item");
      }
    }
  };

  const getGCashPaymentDetails = (
    subsName,
    subsMobile,
    subsEmail,
    gcAcctNo
  ) => {
    subsNameGC.current = subsName;
    subsMobileGC.current = subsMobile;
    subsEmailGC.current = subsEmail;
    subsAcctNoGC.current = gcAcctNo;
    toggleShow();
  };

  const getMayaPaymentDetails = (subsName, subsMobile, subsEmail, gcAcctNo) => {
    subsNameMaya.current = subsName;
    subsMobileMaya.current = subsMobile;
    subsEmailMaya.current = subsEmail;
    subsAcctNoMaya.current = gcAcctNo;
    toggleShow();
  };

  const getOTCPaymentDetails = (subsName, subsMobile, subsEmail) => {
    subsName711.current = subsName;
    subsMobile711.current = subsMobile;
    subsEmail711.current = subsEmail;
    toggleShow();
  };

  const getOnlineBankingPaymentDetails = (subsName, subsMobile, subsEmail) => {
    subsNameOnlineBanking.current = subsName;
    subsMobileOnlineBanking.current = subsMobile;
    subsEmailOnlineBanking.current = subsEmail;
    toggleShow();
  };

  const handlePaymentRequest = () => {
    switch (paymentType) {
      case "gcash":
        if (!hasRequestPayment.current) {
          handlePaymentRequestGCash();
        }
        break;
      case "maya":
        if (!hasRequestPayment.current) {
          handlePaymentRequestMaya();
        }
        break;
      case "seven11":
        if (!hasRequestPayment.current) {
          handlePaymentRequestOTC();
        }
        break;

      case "dragonpay":
        if (!hasRequestPayment.current) {
          handlePaymentRequestOnlineBanking();
        }
        break;

      case "visa":
        break;
      default:
        break;
    }
  };

  const handlePaymentRequestGCash = () => {
    Axios.post(EP.PAY_REQUEST_ONLINE, {
      name: subsNameGC.current,
      mobile: subsMobileGC.current,
      email: subsEmailGC.current,
      acctNo: subsAcctNoGC.current,
      processor: "GCSH",
      provider: vendor,
      planDuration: checkoutDuration,
      planType: checkoutType,
      amount: checkoutPrice,
    })
      .then((res) => {
        if (res.data.status === "ok") {
          if (res.data.redirect === "true") {
            window.location.replace(res.data.url);
            hasRequestPayment.current = true;
          }
        } else {
          hasRequestPayment.current = false;
          console.log("PaymentReqErrorDataGCash");
        }
      })
      .catch((e) => {
        hasRequestPayment.current = false;
        console.log("PaymentReqError" + e);
      });
  };

  //PAY_REQUEST_OTC  PAY_REQUEST_ONLINE
  const handlePaymentRequestMaya = () => {
    Axios.post(EP.PAY_REQUEST_ONLINE, {
      name: subsNameMaya.current,
      mobile: subsMobileMaya.current,
      email: subsEmailMaya.current,
      acctNo: subsAcctNoMaya.current,
      processor: "PYMY", //processor: "PYMY",
      provider: vendor,
      planDuration: checkoutDuration,
      planType: checkoutType,
      amount: checkoutPrice,
    })
      .then((res) => {
        if (res.data.status === "ok") {
          if (res.data.redirect === "true")
            window.location.replace(res.data.url);
          hasRequestPayment.current = true;
        } else {
          hasRequestPayment.current = false;
          console.log("PaymentReqErrorDataMaya");
        }
      })
      .catch((e) => {
        hasRequestPayment.current = false;
        console.log("PaymentReqError" + e);
      });
  };

  //PAY_REQUEST_OTC
  const handlePaymentRequestOTC = () => {
    Axios.post(EP.PAY_REQUEST_OTC, {
      name: subsName711.current,
      mobile: subsMobile711.current,
      email: subsEmail711.current,
      processor: "711",
      provider: vendor,
      planDuration: checkoutDuration,
      planType: checkoutType,
      amount: checkoutPrice,
    })
      .then((res) => {
        if (res.data.status === "ok") {
          if (res.data.redirect === "true")
            window.location.replace(res.data.url);
          hasRequestPayment.current = true;
        } else {
          hasRequestPayment.current = false;
          console.log("PaymentReqErrorDataOTC");
        }
      })
      .catch((e) => {
        hasRequestPayment.current = false;
        console.log("PaymentReqError" + e);
      });
  };

  //
  const handlePaymentRequestOnlineBanking = () => {
    Axios.post(EP.PAY_REQUEST_OTC, {
      name: subsNameOnlineBanking.current,
      mobile: subsMobileOnlineBanking.current,
      email: subsEmailOnlineBanking.current,
      processor: "BANK", //
      provider: vendor,
      planDuration: checkoutDuration,
      planType: checkoutType,
      amount: checkoutPrice,
    })
      .then((res) => {
        console.log("PaymentReqData " + JSON.stringify(res.data));
        if (res.data.status === "ok") {
          if (res.data.redirect === "true")
            window.location.replace(res.data.url);
          hasRequestPayment.current = true;
        } else {
          hasRequestPayment.current = false;
          console.log("PaymentReqErrorDataOTC");
        }
      })
      .catch((e) => {
        hasRequestPayment.current = false;
        console.log("PaymentReqError" + e);
      });
  };

  return (
    <div>
      <Nav bgOpaque={bgOpaque} />
      {vendor !== "" && (
        <div className="checkout-container" style={{ marginTop: navHeight }}>
          <div className="checkout-back--wrapper">
            <div className="cta-back" onClick={handleBackAction}>
              Back
            </div>
            <img
              src={vendorImage}
              alt="vendor_logo"
              className={"back-logo-" + vendor}
            />
          </div>
          <main className="checkout-container--wrapper">
            <section className="checkout-left--wrapper" id="section-left">
              <div className="checkout-left--title">Check out</div>
              <div className="checkout-left-plans--wrapper">
                <div className="checkout-plans-duration-type--wrapper">
                  <div className="checkout-plans--duration">
                    {checkoutDuration}
                  </div>
                  <div className="checkout-plans--type">{checkoutType}</div>
                </div>
                <div className="checkout-plans--price">{checkoutPrice}</div>
              </div>
              <small className="payment-method-title">
                Select Payment Method
              </small>
              <article className="payment-method-wrapper">
                <div
                  className={
                    vendor !== "vivamax" && vendor !== "viva-one"
                      ? "payment-method-item"
                      : isCheckoutPriceMin50
                  }
                  id="gcash"
                  onClick={(e) => {
                    handlePaymentMethod(e);
                  }}
                >
                  <div>GCash</div>
                  <img src={Assets.GCASH} alt="gcash_logo" />
                </div>
                <div
                  className="payment-method-item"
                  id="maya"
                  onClick={(e) => {
                    handlePaymentMethod(e);
                  }}
                >
                  <div>Maya</div>
                  <img src={Assets.MAYA} alt="maya_logo" />
                </div>
                <div
                  className={isCheckoutPriceMin50}
                  id="seven11"
                  onClick={(e) => {
                    handlePaymentMethod(e);
                  }}
                >
                  <div>7-Eleven</div>
                  <img src={Assets.SEVEN11} alt="senven11_logo" />
                </div>
                <div
                  className="payment-method-item item-disable"
                  id="visa"
                  onClick={(e) => {
                    handlePaymentMethod(e);
                  }}
                >
                  <div>Debit/Credit Card</div>
                  <img src={Assets.VISA} alt="visa_logo" />
                </div>
                <div
                  className={
                    vendor !== "vivamax" && vendor !== "viva-one"
                      ? "payment-method-item"
                      : isCheckoutPriceMin50
                  }
                  id="dragonpay"
                  onClick={(e) => {
                    handlePaymentMethod(e);
                  }}
                >
                  <div>Online Banking</div>
                  <img src={Assets.DRAGONPAY} alt="dragonpay_logo" />
                </div>
              </article>
            </section>
            {/* RIGHT */}
            <section
              className={
                show
                  ? "checkout-right--wrapper visible"
                  : "checkout-right--wrapper hidden"
              }
              style={{ minHeight: formHeight }}
            >
              {show ? (
                <div className="checkout-form-container">
                  {displaySpecificPayment()}
                </div>
              ) : (
                <div style={{ height: formHeight }}></div>
              )}
            </section>
          </main>
        </div>
      )}

      <MDBModal
        animationDirection="right"
        show={showModal}
        tabIndex="-1"
        setShow={setShowModal}
        staticBackdrop="true"
      >
        <MDBModalDialog className="modal-dialog-centered payment-modal">
          <MDBModalContent>
            <MDBModalHeader className="bg-primary text-white">
              <MDBModalTitle>Subscription Confirmation</MDBModalTitle>
              <button
                className="btn-close btn-close-white"
                onClick={toggleShow}
              ></button>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <div className="col-12 text-center">
                  <p>
                    You are about to subscribe to
                    {" " + vendor.toUpperCase()}. Make sure that all the
                    information you provided are correct.
                  </p>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <button
                className="btn btn-primary"
                onClick={handlePaymentRequest} //requestPayment()}
              >
                Proceed
              </button>
              <button className="btn btn-primary " onClick={toggleShow}>
                Cancel
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Checkout;
