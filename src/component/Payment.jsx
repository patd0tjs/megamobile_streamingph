import React, { useEffect, useState, useRef } from "react";
import "./payment.css";
import { useAppContext } from "../context/Context";
import Axios from "axios";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import EP from "./Endpoint";
import Assets from "./Assets";

const ValidateUrl = (callback = () => {}) => {
  const hasBeenCalled = useRef();
  if (hasBeenCalled.current) return;
  callback();
  hasBeenCalled.current = true;
};

const Payment = () => {
  const getUrl = window.location.href;
  const urlString = new URL(getUrl);
  const refNo = urlString.searchParams.get("ref");
  const txnId = urlString.searchParams.get("txn");
  const status = urlString.searchParams.get("status");

  const bgOpaque = false;
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState();
  const [paymentMessage, setPaymentMessage] = useState();
  const [validUrl, setValidUrl] = useState(true);

  const [success, setSuccess] = useState(false);

  const { navHeight } = useAppContext();

  useEffect(() => {
    if (!validUrl) {
      navigate("/", {});
    } else if (!success) {
      verifyStatusAndRef();
    }
  }, [success]);

  const verifyStatusAndRef = () => {
    Axios.post(EP.VERIFY_STATUS_REF, {
      referenceNo: refNo,
      transactionId: txnId,
      status: status,
    })
      .then((res) => {
        if (res.data.status === "ok") {
          setSuccess(true);
          setPaymentStatus(res.data.paymentStatus);
          setPaymentMessage(res.data.paymentMessage);
        } else if (res.data.status === "error") navigate("/", {});
      })
      .catch((e) => {
        console.log("VERIFY_STATUS_REF: " + e);
      });
  };

  ValidateUrl(() => {
    if (!refNo || !txnId || !status) setValidUrl(false);
  });

  return (
    <section className="payment-container">
      <Nav bgOpaque={bgOpaque} />

      {success && (
        <div
          className="payment-container--wrapper"
          style={{ marginTop: navHeight, paddingBottom: navHeight }}
        >
          <div className="payment-details">
            <h1>Payment {paymentStatus}!</h1>           
            <p>{paymentMessage}</p>
            <img src={Assets.MAIN_LOGO_BLACK} alt="logo-image" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Payment;
