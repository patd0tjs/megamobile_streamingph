import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Context";
import Assets from "./Assets";

const PlansTapGo = (props) => {
  const plansTapGoData = props.plansData;
  const tagline = props.tagline;
  const logo = props.logo;
  const tapgoMovies = props.tapgoMovies;

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

  const handlePriceAction = (duration, type, price, vendor) => {
    setVendor("tapgo");
    setVendorImage(Assets.TAPGO);
    setOrigin("plans");
    setCheckoutDuration(duration);
    setCheckoutType(type);
    setCheckoutPrice(price);
    navigate("/checkout", {});
  };

  return (
    <div>
      <section className="plans-container-tapgo">
        <div className="plans-container--title">{tagline}</div>

        <div className="plans-tapgo--image-wrapper">
          {logo && (
            <img src={logo} alt="tapgo-logo" className="plans-tapgo-logo" />
          )}

          <div>
            {tapgoMovies && (
              <img
                src={tapgoMovies}
                alt="tapgo-movies"
                className="plans-tapgo-movies"
              />
            )}
          </div>
        </div>
      </section>

      <section className="plans-tapgo--card-wrapper ">
        {plansTapGoData.map(
          ({ id, vendor, duration, type, price, description }) => {
            return (
              <div className="plans--card-tapgo card-tapgo" key={id}>
                <div className="plans-card--duration duration-tapgo">
                  {duration}
                </div>
                <div className="plans-card--type type-tapgo">{type}</div>
                <small className="plans-card--description-tapgo">
                  {description}
                </small>
                <button
                  className="plans-card--button"
                  onClick={() => {
                    handlePriceAction(duration, type, price, vendor);
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

export default PlansTapGo;
