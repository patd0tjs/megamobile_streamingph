import React, { useState, useEffect, useRef } from "react";
// import { useAppContext } from "../context/Context";
import { useQuery } from "react-query";
import Nav from "./Nav";
import Header from "./Header";
import Subscribe from "./Subscribe";
import Faqs from "./Faqs";
import FooterHome from "./FooterHome";
import EP from "./Endpoint";
import Axios from "axios";

import {
  browserName,
  // browserVersion,
  isMobile,
  // isBrowser,
} from "react-device-detect";

// const Init = (callback = () => {}) => {
//   const hasBeenCalled = useRef();
//   if (hasBeenCalled.current) return;
//   callback();
//   hasBeenCalled.current = true;
// };

const getArticles = () => {
  return Axios.post(EP.GET_ARTICLES, {});
};

const getTrailers = () => {
  return Axios.post(EP.GET_TRAILERS, {});
};

const Home = () => {
  const getUrl = window.location.href;
  const urlString = new URL(getUrl);

  const bgOpaque = false;
  // const [isNotSafari, setNotSafari] = useState(false);
  // const { isVisited, setVisited } = useAppContext();

  // const { setArticlesDataList } = useAppContext();

  const logVisit = () => {
    const device = isMobile ? "mobile" : "desktop";
    return Axios.post(EP.LOG_VISIT, {
      device: device,
      browser: browserName,
    });
  };

  //useQuery() Parameters = isLoadingFLAG,ApiDATA,isErrorFLAG,errorTHROWN
  const {
    isLoading: loadingArticle,
    data: dataArticle,
    isError: isErrorArticle,
    error: errorArticle,
  } = useQuery("articles", getArticles, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: loadingTrailers,
    data: dataTrailer,
    isError: isErrorTrailer,
    error: errorTrailer,
  } = useQuery("trailers", getTrailers, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  //DONT FORGET: REMOVE WHEN DEVELOPMENT
  const {
    isLoading: loadingVisit,
    data: dataVisit,
    isError: isErrorVisit,
    error: errorVisit,
  } = useQuery("visit", logVisit, {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: urlString.hostname !== "localhost" ? true : false,
    staleTime: 1800000, //30mins
  });

  //Not Inlcuded Anymore
  // Init(() => {
  // logVisit();
  // if (!isVisited) {
  // setVisited(true);
  //   console.log(browserName);
  //   console.log("MOBILE " + isMobile);
  //   console.log("BROWSER: " + isBrowser);
  // }
  // onsole.log(browserName);
  // if (browserName.includes("Safari")) setNotSafari(false);
  // else setNotSafari(true);
  // if (!isVisited) {
  //   console.log(browserName);
  //   console.log("MOBILE " + isMobile);
  //   console.log("BROWSER: " + isBrowser);
  // }
  // });
  return (
    <div>
      <Nav bgOpaque={bgOpaque} />
      <Header
        articlesData={dataArticle?.data.article}
        trailersData={dataTrailer?.data.article}
      />
      <Subscribe />
      <Faqs />
      <FooterHome />
    </div>
  );
};

export default Home;
