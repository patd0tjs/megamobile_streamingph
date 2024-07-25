import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "react-query";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "./Nav";
import "./plans.css";
import EP from "./Endpoint";
import PlansViu from "./PlansViu";
import PlansVivaMax from "./PlansVivaMax";
import PlansTapGo from "./PlansTapGo";
import FooterLogo from "./FooterLogo";
import PlansVivaOne from "./PlansVivaOne";
import PlansCignal from "./PlansCignal";
import PlansCPlay from "./PlansCPlay";
import PlansPilipinasLive from "./PlansPilipinasLive";
import PlansSatlite from "./PlansSatlite";
import { useAppContext } from "../context/Context";
import Assets from "./Assets";

const getUrl = window.location.href;
const urlString = new URL(getUrl);
const _source = urlString.searchParams.get("src");
const _vendor = urlString.searchParams.get("ven");

const checkVendor = () => {
  if (_source && _vendor) {
    return Axios.post(EP.CHECK_VENDOR, {
      source: _source,
      vendor: _vendor,
    });
  }
};

const ValidateUrl = (callback = () => {}) => {
  const hasBeenCalled = useRef();
  if (hasBeenCalled.current) return;
  callback();
  hasBeenCalled.current = true;
};

const Plans = (props) => {
  const queryClient = props.queryClient;
  const bgOpaque = false;
  const navigate = useNavigate();
  const location = useLocation();
  const [hasVendor, setHasVendor] = useState(true);
  const [plansData, setPlansData] = useState(false);
  const [tagline, setTagline] = useState("");
  const [logo, setLogo] = useState();
  const [tapgoMovies, setTapgoMovies] = useState("");
  const [linkVerified, setLinkVerified] = useState(false);

  const { navHeight, vendor } = useAppContext();

  const getPlans = () => {
    // console.log("getPlans");
    return Axios.post(EP.GET_PLANS, {
      provider: vendor ? vendor : _vendor ? _vendor : "",
    });
  };

  const {
    isLoading: isLoadingPlans,
    data: dataPlans,
    isError: isErrorPlans,
    error: errorPlans,
  } = useQuery("plans", getPlans, {
    onSuccess: (data) => {
      if (data) {
        if (data.data.status === "ok") {
          setPlansData(true);
        } else {
          getPlans();
        }
      }
    },
  });

  const {
    isLoading: isLoadingVendor,
    data: dataVendor,
    isError: isErrorVendor,
    error: errorVendor,
  } = useQuery("vendor", checkVendor, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      if (data) {
        if (data.data.status === "ok") {
          getPlans();
        } else {
          if (!vendor) setHasVendor(false);
        }
      }
    },
  });

  // const { mutate } = useMutation(checkVendor);

  // if (isErrorPlans) console.log("PlansError: " + errorPlans.message);
  // if (isErrorVendor) console.log("VendorError: " + errorVendor.message);

  // if (isLoadingVendor) console.log("isLoadingVendor... ");
  // if (isLoadingPlans) console.log("isLoadingPlans... ");
  // if (dataPlans)
  // console.log(JSON.stringify("DataPLAN: " + dataPlans));
  // // if (dataVendor)
  // console.log(JSON.stringify("DataVENDOR: " + dataVendor));
  // console.log(JSON.stringify("DataHASVENDOR: " + hasVendor));

  // console.log(vendor);
  // console.log("D: " + dataPlans);

  // useMutation("vendor", {
  //   onError: () => {
  //     console.log("useMutation");
  //   },
  // });

  useEffect(() => {
    if (!hasVendor) {
      navigate("/", {});
      return;
    }
  }, [hasVendor]);

  const handleBackAction = () => {
    navigate("/", {});
  };

  const displayVendor = () => {
    const newVendor = vendor ? vendor : _vendor ? _vendor : "";
    switch (newVendor) {
      case "viu":
        return (
          <PlansViu
            plansData={dataPlans ? dataPlans.data.plan : []}
            tagline={dataPlans ? dataPlans.data.plan[0].tagline : ""}
            logo={dataPlans ? dataPlans.data.plan[0].logo : ""}
          />
        );

      case "vivamax":
        return (
          <PlansVivaMax
            plansData={dataPlans ? dataPlans.data.plan : []}
            tagline={dataPlans ? dataPlans.data.plan[0].tagline : ""}
            logo={dataPlans ? dataPlans.data.plan[0].logo : ""}
          />
        );
      case "tapgo":
        return (
          <PlansTapGo
            plansData={dataPlans ? dataPlans.data.plan : []}
            tagline={dataPlans ? dataPlans.data.plan[0].tagline : ""}
            logo={dataPlans ? dataPlans.data.plan[0].logo : ""}
            tapgoMovies={
              dataPlans ? dataPlans.data.plan[1].logo : Assets.TAPGO_MOVIES
            }
          />
        );
      case "viva-one":
        return (
          <PlansVivaOne
            plansData={dataPlans ? dataPlans.data.plan : []}
            tagline={dataPlans ? dataPlans.data.plan[0].tagline : ""}
            logo={dataPlans ? dataPlans.data.plan[0].logo : ""}
          />
        );
      case "cignal":
        return (
          <PlansCignal
            plansData={dataPlans ? dataPlans.data.plan : []}
            tagline={dataPlans ? dataPlans.data.plan[0].tagline : ""}
            logo={dataPlans ? dataPlans.data.plan[0].logo : ""}
          />
        );
      case "cplay":
        return (
          <PlansCPlay
            plansData={dataPlans ? dataPlans.data.plan : []}
            tagline={dataPlans ? dataPlans.data.plan[0].tagline : ""}
            logo={dataPlans ? dataPlans.data.plan[0].logo : ""}
          />
        );
      case "pilipinas-live":
        return (
          <PlansPilipinasLive
            plansData={dataPlans ? dataPlans.data.plan : []}
            tagline={dataPlans ? dataPlans.data.plan[0].tagline : ""}
            logo={dataPlans ? dataPlans.data.plan[0].logo : ""}
          />
        );
      case "satlite":
        return (
          <PlansSatlite
            plansData={dataPlans ? dataPlans.data.plan : []}
            tagline={dataPlans ? dataPlans.data.plan[0].tagline : ""}
            logo={dataPlans ? dataPlans.data.plan[0].logo : ""}
          />
        );
      default:
        return;
    }
  };

  //Initial
  ValidateUrl(() => {
    if (_source && _vendor) {
      console.log("");
      //   // checkVendor();
      //   // mutate(mutate);
    } else if (!vendor) {
      setHasVendor(false);
    }
  });

  return (
    <>
      {plansData ? (
        <div>
          <Nav bgOpaque={bgOpaque} />
          <div className="plans-container" style={{ marginTop: navHeight }}>
            <div className="cta-back" onClick={handleBackAction}>
              Back
            </div>
            <div className="plans-container--wrapper">{displayVendor()}</div>
            <FooterLogo />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Plans;
