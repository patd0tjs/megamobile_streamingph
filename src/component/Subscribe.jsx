import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./subscribe.css";
import { useAppContext } from "../context/Context";
import Assets from "./Assets";
import EP from "./Endpoint";
import Axios from "axios";
import { useQuery } from "react-query";

const data = [
  {
    id: 1, //
    name: "viu",
    image: "https://streamingph.com/sph/assets/viu_black.png",
    shade: "#F5B91A",
    description:
      "Subscribe to Asia's best streaming entertainment app featuring the latest K-Drama and reality shows fresh from the source.",
  },
  {
    id: 2,
    name: "vivamax",
    image: "https://streamingph.com/sph/assets/viva_max.png",
    shade: "#004070",
    description:
      "Non-stop Pinoy action movies and more updated every month for your viewing pleasure.",
  },
  {
    id: 3,
    name: "tapgo",
    image: "https://streamingph.com/sph/assets/tapgo.png",
    shade: "#002F4C",
    description:
      "Live streaming at its best, TapGo TV offers live channels in HD. Enjoy a wide selection of channels to choose from. From Action to sports everything you need is here.",
  },
  {
    id: 4,
    name: "viva-one",
    image: "https://streamingph.com/sph/assets/viva_one.png",
    shade: "#004070",
    description:
      "Get a load of the latest Pinoy TV series and blockbuster movies featuring your favorite stars. All the best classic movies on one platform.",
  },
  {
    id: 5,
    name: "cignal",
    image: "https://streamingph.com/sph/assets/cignal.png",
    shade: "#EF182E",
    description:
      "Cable TV service catering to provincial areas featuring selected local and foreign entertaiment channels",
  },
  {
    id: 6,
    name: "cplay",
    image: "https://streamingph.com/sph/assets/cplay.png",
    shade: "#EF182E",
    description:
      "Cignal TV mobile streaming service featuring premium entertainment channels and sports",
  },
  {
    id: 7,
    name: "pilipinas-live",
    image: "https://streamingph.com/sph/assets/pilipinas-live.png",
    shade: "#002F4C",
    description:
      "Premium streeaming service featuring aggregated sporting channels under Cignal TV",
  },
  {
    id: 8,
    name: "satlite",
    image: "https://streamingph.com/sph/assets/satlite.png",
    shade: "#004070",
    description:
      "Cable TV service catering to provincial areas featuring selected local and foreign entertaiment channels",
  },
];

const getPlans = (vendorName) => {
  if (vendorName) {
    return Axios.post(EP.GET_PLANS, {
      provider: vendorName,
    });
  }
};

const Subscribe = () => {
  //Custom Hooks
  const {
    navHeight,
    setNavHeight,
    vendor,
    setVendor,
    origin,
    setOrigin,
    vendorImage,
    setVendorImage,
  } = useAppContext();

  const navigate = useNavigate();

  const handleBuyNow = (name, image) => {
    setVendor(name);
    setVendorImage(image);
    navigate("/plans", {});
  };

  return (
    <section className="subscribe-container" id="subscribe">
      <div
        className="subscribe-container--wrapper"
        style={{ marginTop: navHeight }}
      >
        <article className="subscribe--header-wrapper">
          <h1 className="subscribe--title">
            Select Your Favorite Streaming Service
          </h1>
          <h1 className="subscribe--title">
            And Enjoy Endless Entertainment Right Now!
          </h1>
        </article>
        <article className="subscribe--card-wrapper">
          {data.map(({ id, name, image, shade, description }) => {
            return (
              <div
                key={id}
                className="subscribe--card-item"
                style={{ backgroundColor: shade }}
              >
                <div className="subscribe--card-logo--wrapper">
                  <img
                    src={image}
                    alt={name + "-logo"}
                    className={"subscribe--card-logo-" + name}
                  />
                </div>
                <small className={"subscribe--card-description-" + name}>
                  {description}
                </small>
                <div>
                  <button
                    className="btn-custom"
                    onClick={() => {
                      handleBuyNow(name, image);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
};

export default Subscribe;
