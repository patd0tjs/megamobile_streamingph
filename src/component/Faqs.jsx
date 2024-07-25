import React, { useState } from "react";
import "./faqs.css";
import { useAppContext } from "../context/Context";
import Assets from "./Assets";

const data = [
  {
    id: 1,
    name: "maya",
    image: Assets.MAYA,
  },
  {
    id: 2,
    name: "gcash",
    image: Assets.GCASH,
  },
  {
    id: 3,
    name: "dragonpay",
    image: Assets.DRAGONPAY,
  },
];

const data2 = [
  {
    id: 4,
    name: "visa",
    image: Assets.VISA,
  },

  {
    id: 5,
    name: "seven11",
    image: Assets.SEVEN11,
  },
];

const Faqs = () => {
  //Custome Hooks
  const { navHeight, setNavHeight, vendor, setVendor, origin, setOrigin } =
    useAppContext();

  return (
    <section className="faqs-container" id="faqs">
      <div className="faqs-container--wrapper" style={{ marginTop: navHeight }}>
        <article className="faqs--header-wrapper">
          <h1 className="faqs--title">Payment made easy!</h1>
          <p className="faqs--text">
            You can buy your subscription pins anytime with the following
            payment methods and receive your pins through your email or SMS.
          </p>
        </article>
        <article className="faqs--image-wrapper">
          {data.map(({ id, name, image }) => {
            return (
              <div key={id} className="faqs--image-item">
                <img
                  src={image}
                  alt={name + "-image"}
                  className={"faqs-image-" + name}
                />
              </div>
            );
          })}
        </article>
        <article className="faqs--image-wrapper-2">
          {data2.map(({ id, name, image }) => {
            return (
              <div key={id} className="faqs--image-item">
                <img
                  src={image}
                  alt={name + "-image"}
                  className={"faqs-image-" + name}
                />
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
};

export default Faqs;
