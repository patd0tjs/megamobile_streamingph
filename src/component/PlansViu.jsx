import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Context";
import Assets from "./Assets";

const PlansViu = (props) => {
  const plansViuData = props.plansData;
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
    setVendor("viu");
    setVendorImage(Assets.VIU_YELLOW);
    setOrigin("plans");
    setCheckoutDuration(duration);
    setCheckoutType(type);
    setCheckoutPrice(price);
    navigate("/checkout", {});
  };

  return (
    <div>
      <div className="plans-container--title">{tagline}</div>

      <div className="plans-container--image-wrapper">
        {logo && <img src={logo} alt="viu-logo" className="plans-logo" />}
      </div>
      <section className="plans--card-wrapper ">
        {plansViuData.map(
          ({ id, vendor, duration, type, description, price }) => {
            return (
              <div className="plans--card card-viu" key={id}>
                <div className="plans-card--duration duration-viu">
                  {duration}
                </div>
                <div className="plans-card--type type-viu">{type}</div>
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
    </div>
  );
};

export default PlansViu;
