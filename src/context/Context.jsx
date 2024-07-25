import React, { useState, useContext } from "react";

const AppContext = React.createContext();

//Custom Hooks.
export const useAppContext = () => {
  return useContext(AppContext);
};

const ContextProvider = ({ children }) => {
  const [vendorImage, setVendorImage] = useState("");
  const [vendor, setVendor] = useState("");
  const [origin, setOrigin] = useState("");
  const [checkoutDuration, setCheckoutDuration] = useState("");
  const [checkoutType, setCheckoutType] = useState("");
  const [checkoutPrice, setCheckoutPrice] = useState("");
  const [navHeight, setNavHeight] = useState();
  const [formHeight, setFormHeight] = useState();
  //Plans
  const [plansDataContext, setPlansDataContext] = useState([]);
  const [taglineContext, setTaglineContext] = useState("");
  const [logoContext, setLogoContext] = useState("");
  const [tapgoMoviesContext, setTapgoMoviesContext] = useState("");
  const [isVisited, setVisited] = useState(false);
  const [articlesDataList, setArticlesDataList] = useState([]); //
  const [isArticleLoadMore, setArticleLoadMore] = useState(false); //
  const [trailersDataList, setTrailersDataList] = useState([]); //
  const [isTrailerLoadMore, setTrailerLoadMore] = useState(false); //

  return (
    <AppContext.Provider
      value={{
        vendor,
        setVendor,
        origin,
        setOrigin,
        checkoutDuration,
        setCheckoutDuration,
        checkoutType,
        setCheckoutType,
        checkoutPrice,
        setCheckoutPrice,
        navHeight,
        setNavHeight,
        formHeight,
        setFormHeight,
        vendorImage,
        setVendorImage,
        plansDataContext,
        setPlansDataContext,
        taglineContext,
        setTaglineContext,
        logoContext,
        setLogoContext,
        tapgoMoviesContext,
        setTapgoMoviesContext,
        isVisited,
        setVisited,
        articlesDataList,
        setArticlesDataList,
        isArticleLoadMore,
        setArticleLoadMore,
        trailersDataList,
        setTrailersDataList,
        isTrailerLoadMore,
        setTrailerLoadMore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
