import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Context";
import Assets from "./Assets";

const PlansVivaOne = (props) => {
  const plansVivaOneData = props.plansData;
  const tagline = props.tagline;
  const logo = props.logo;

  const navigate = useNavigate();

  //Custom Hooks
  const {
    setVendor,
    setVendorImage,
    setOrigin,
    setCheckoutDuration,
    setCheckoutType,
    setCheckoutPrice,
  } = useAppContext();

  const handlePriceAction = (duration, type, price) => {
    setVendor("viva-one");
    setVendorImage(Assets.VIVA_ONE);
    setOrigin("plans");
    setCheckoutDuration(duration);
    setCheckoutType(type);
    setCheckoutPrice(price);
    navigate("/checkout", {});
  };

  return (
    <>
      <div className="plans-container--title">
        {tagline}
      </div>
      <div className="plans-container--image-wrapper">
        {logo && <img src={logo} alt="vivaone-logo" className="logo-for-all" />}
      </div>
      <section className="plans--card-wrapper">
        {plansVivaOneData.map(
          ({ id, vendor, duration, type, description, price }) => {
            return (
              // {}
              <div className="plans--card card-viva" key={id}>
                <div className="plans-card--duration duration-viva">
                  {duration}
                </div>
                <div className="plans-card--type type-viva">{type}</div>
                <small className="plans-card--description">{description}</small>
                <button
                  className="plans-card--button"
                  onClick={() => {
                    handlePriceAction(duration, type, price);
                  }}
                >
                  {price}
                </button>
              </div>
            );
          }
        )}
      </section>
    </>
  );
};

export default PlansVivaOne;
