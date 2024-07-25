import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import { useAppContext } from "../context/Context";
import EP from "./Endpoint";
import Assets from "./Assets";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

const Header = (props) => {
  const articlesData = props.articlesData;
  const trailersData = props.trailersData;
  const {
    navHeight,
    setVendor,
    setVendorImage,
    articlesDataList,
    isArticleLoadMore,
    setArticleLoadMore,
    trailersDataList,
    isTrailerLoadMore,
    setTrailerLoadMore,
  } = useAppContext();
  const navigate = useNavigate();
  const nextButton = useRef();
  const nextButtonTrailer = useRef();
  const [next, setNext] = useState("handle hidden");
  const [nextTrailer, setNextTrailer] = useState("handle-trailer hidden");
  const [lastID, setLastID] = useState();
  const [lastTrailerID, setLastTrailerID] = useState();

  // const [articleObserver, setArticleObserver] = useState();

  //
  useEffect(() => {
    if (!articlesData) return;
    if (Object.keys(articlesData).length > 0) {
      //ARTICLE
      const articleItemList = document.querySelectorAll(".article--item"); //what to observe: observe all item in the articleItemList
      const articleObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) articleObserver.unobserve(entry.target); //unobserve each entry/item once it it visible
          });
        },
        {} //load all first threshold: 0
      );
      // setArticleObserver(intersectionObserver);

      //ObserverForLastItem: ARTICLE
      const lastItemObserver = new IntersectionObserver((entries) => {
        const lastItem = entries[0]; //will observe the lastItem only
        //hide if not visible. Not Intersecting
        if (!lastItem.isIntersecting) {
          setNext("handle hidden");
          return; //return if not visible
        }
        setLastID(lastItem.target.id);
        //DONT Show NEXT IF Note: <= 1 ID from DB table //upto 50 articles items only //less than 10 (theLimit)
        if (
          parseInt(lastItem.target.id) <= 1 ||
          articlesDataList.length <= 9 ||
          articlesDataList.length >= 50
        ) {
          return;
        }
        setNext("handle");
        //After the last item is being visible, unobserve, because the last item will not be the last item anymore because of new item added in the parentClass("header-article snap-inline")
        lastItemObserver.unobserve(lastItem.target);
        //Observe again for the new Data
        lastItemObserver.observe(
          document.querySelector(".article--item:last-child")
        );
      }, {});

      //ObserveFunction: Must be outside of the object creation of IntersectionObserver()
      //ARTICLE
      //what to observe: The articleItemList, observe all item in the articleItemList
      articleItemList.forEach((item) => {
        articleObserver.observe(item);
      });
      //what to observe: The ".article--item:last-child", the last item only
      lastItemObserver.observe(
        document.querySelector(".article--item:last-child")
      );
    }

    /*TRAILER --- TRAILER */
    if (!trailersData) return;
    if (Object.keys(articlesData).length > 0) {
      const trailerItemList = document.querySelectorAll(".trailer--item"); //what to observe: observe all item in the articleItemList
      const trailerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) trailerObserver.unobserve(entry.target); //unobserve each entry/item once it it visible
        });
      }, {});

      //ObserverForLastItem: TRAILER
      const lastTrailerObserver = new IntersectionObserver((entries) => {
        const lastTrailer = entries[0]; //will observe the lastItem only
        //hide if not visible. Not Intersecting
        if (!lastTrailer.isIntersecting) {
          setNextTrailer("handle-trailer hidden");
          return; //return if not visible
        }
        setLastTrailerID(lastTrailer.target.id);
        //DONT Show NEXT IF Note: <= 1 ID from DB table //upto 50 articles items only //less than 10 (theLimit)
        if (
          parseInt(lastTrailer.target.id) <= 1 ||
          trailersDataList.length <= 9 ||
          trailersDataList.length >= 50
        ) {
          return;
        }
        setNextTrailer("handle-trailer");
        //After the last item is being visible, unobserve, because the last item will not be the last item anymore because of new item added in the parentClass("header-article snap-inline")
        lastTrailerObserver.unobserve(lastTrailer.target);
        //Observe again for the new Data
        lastTrailerObserver.observe(
          document.querySelector(".trailer--item:last-child")
        );
      }, {});
      //ObserveFunction: Must be outside of the object creation of IntersectionObserver()
      //TRAILER
      //what to observe: The trailerItemList, observe all item in the articleItemList
      trailerItemList.forEach((item) => {
        trailerObserver.observe(item);
      });
      //what to observe: The ".article--item:last-child", the last item only
      lastTrailerObserver.observe(
        document.querySelector(".trailer--item:last-child")
      );
    }
  }, [
    trailersData,
    articlesData,
    lastID,
    lastTrailerID,
    next,
    articlesDataList,
    trailersDataList,
    // noMoreArticleItem,
    // newArticleLoaded,
  ]); //

  // const loadNewArticles = (pid, intersectionObserver) => {
  // const loadNewArticles = (newArticlesData) => {
  //   const articleContainer = document.querySelector(".header-article"); //parent class
  //   if (newArticlesData) {
  //     newArticlesData.forEach(
  //       ({ id, image, title, date, content, editor, link }) => {
  //         const newArticleItem = document.createElement("div");
  //         const newImage = document.createElement("img");
  //         const descriptionWrapper = document.createElement("div");
  //         const descriptionDiv = document.createElement("div");
  //         const descriptionH6 = document.createElement("h6");
  //         const descriptionSmall = document.createElement("small");
  //         const descriptionPara = document.createElement("p");
  //         descriptionH6.textContent = title;
  //         descriptionSmall.textContent = editor + "|" + date;
  //         descriptionPara.textContent = content;
  //         //
  //         newArticleItem.classList.add("article--item"); //make a className on that div
  //         newArticleItem.setAttribute("id", id); //make a className on that div
  //         newArticleItem.onclick = function () {
  //           handleOnClickArticle(image, title, date, content, editor, link);
  //         };

  //         descriptionWrapper.classList.add("article-description--wrapper"); //make a className
  //         newImage.setAttribute("src", image); //make a className on that div
  //         newImage.setAttribute("alt", "article"); //make a className on that div
  //         //
  //         descriptionWrapper.append(descriptionDiv, descriptionPara);
  //         descriptionDiv.append(descriptionH6, descriptionSmall);
  //         newArticleItem.append(newImage, descriptionWrapper);
  //         articleObserver.observe(newArticleItem); //Add to observe
  //         articleContainer.append(newArticleItem); //Adding to the parent class.
  //       }
  //     );
  //   }
  // };

  const handleNext = () => {
    nextButton.current.disabled = true; //avoid multiClicks not clickable
    nextButton.current.hidden = true; //dont show immmediately
    getArticles();
  };

  const handleNextTrailer = () => {
    nextButtonTrailer.current.disabled = true; //avoid multiClicks not clickable
    nextButtonTrailer.current.hidden = true; //dont show immmediately
    getTrailers();
  };

  const getArticles = () => {
    Axios.post(EP.GET_ARTICLES, {
      id: lastID - 1,
    })
      .then((res) => {
        if (res.data.status === "ok") {
          articlesDataList.push(...res.data.article); //add the elements data from array to array
          // loadNewArticles(res.data.article);
          setArticleLoadMore(true);
          nextButton.current.disabled = false; //clickable again
          if (res.data.article.length >= 10) nextButton.current.hidden = false; //show again
        } else {
          console.log("ArticleStatusError: " + res.data.status);
        }
      })
      .catch((e) => {
        console.log("ArticleError: " + e);
      });
  };

  const getTrailers = () => {
    console.log("D: " + lastTrailerID);
    Axios.post(EP.GET_TRAILERS, {
      id: lastTrailerID - 1,
    })
      .then((res) => {
        if (res.data.status === "ok") {
          trailersDataList.push(...res.data.article); //add the elements data from array to array
          setTrailerLoadMore(true);
          nextButtonTrailer.current.disabled = false; //clickable again
          if (res.data.article.length >= 10)
            nextButtonTrailer.current.hidden = false; //show again
        } else {
          console.log("TrailerStatusError: " + res.data.status);
        }
      })
      .catch((e) => {
        console.log("TrailerError: " + e);
      });
  };

  const handleOnClickArticle = (image, title, date, content, editor, link) => {
    navigate("/article/" + link, {
      state: {
        image,
        title,
        date,
        content,
        editor,
        link,
      },
    });
  };

  const handleOnClickLogo = (name, image) => {
    setVendor(name);
    setVendorImage(image);
    navigate("/plans", {});
  };

  const providerLogo = (provider) => {
    switch (provider) {
      case "viu":
        return (
          <img
            className={"trailer--provider-logo-" + provider}
            src={Assets.VIU_BLACK}
            alt="trailer"
            style={{ backgroundColor: "#f5b91a" }}
            onClick={() => {
              handleOnClickLogo(provider, Assets.VIU_BLACK);
            }}
          />
        );
      case "vivamax":
        return (
          <img
            className={"trailer--provider-logo-" + provider}
            src={Assets.VIVAMAX}
            alt="trailer"
            style={{ backgroundColor: "#000000" }}
            onClick={() => {
              handleOnClickLogo(provider, Assets.VIVAMAX);
            }}
          />
        );
      case "viva-one":
        return (
          <img
            className={"trailer--provider-logo-" + provider}
            src={Assets.VIVA_ONE}
            alt="trailer"
            style={{ backgroundColor: "#ffffff" }}
            onClick={() => {
              handleOnClickLogo(provider, Assets.VIVA_ONE);
            }}
          />
        );
      case "tapgo":
        return (
          <img
            className={"trailer--provider-logo-" + provider}
            src={Assets.TAPGO}
            alt="trailer"
            style={{ backgroundColor: "#000000" }}
            onClick={() => {
              handleOnClickLogo(provider, Assets.TAPGO);
            }}
          />
        );
      default:
        return <img src="" alt="trailer" />;
    }
  };

  // const articlesDataInit = () => {
  //   articlesDataList.map(
  //     ({ id, image, title, date, content, editor, link }) => {
  //       return (
  //         <div
  //           className="article--item"
  //           key={id}
  //           id={id}
  //           onClick={() => {
  //             handleOnClickArticle(image, title, date, content, editor, link);
  //           }}
  //         >
  //           <img src={image} alt="article" />
  //           <div className="article-description--wrapper">
  //             <div>
  //               <h6>{title}</h6>
  //               <small>
  //                 {dateFormat(date.substring(0, 10), "mmm dd, yyyy")}
  //               </small>
  //             </div>
  //             <p>{content}</p>
  //           </div>
  //         </div>
  //       );
  //     }
  //   );
  // };

  // const articlesDataLocal = () => {
  //   articlesData.map(({ id, image, title, date, content, editor, link }) => {
  //     return (
  //       <div
  //         className="article--item"
  //         key={id}
  //         id={id}
  //         onClick={() => {
  //           handleOnClickArticle(image, title, date, content, editor, link);
  //         }}
  //       >
  //         <img src={image} alt="article" />
  //         <div className="article-description--wrapper">
  //           <div>
  //             <h6>{title}</h6>
  //             <small>{dateFormat(date.substring(0, 10), "mmm dd, yyyy")}</small>
  //           </div>
  //           <p>{content}</p>
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  if (!isArticleLoadMore && articlesData && articlesDataList.length <= 0) {
    articlesDataList.push(...articlesData);
  }

  if (!isTrailerLoadMore && trailersData && trailersDataList.length <= 0) {
    trailersDataList.push(...trailersData);
  }

  var preview = (id, type) => {
    return type == "btn" ? "#view" + id : "view" + id;
  };

  var dailymotionLink = (link) => {
    return (
      "https://geo.dailymotion.com/player.html?video=" + link.substring(34)
    );
  };

  const thumbnail = (link, src) => {
    return src == "dm"
      ? "https://www.dailymotion.com/thumbnail/video/" + link.substring(34)
      : "http://img.youtube.com/vi/" + link.substring(30) + "/sddefault.jpg";
  };
  return (
    <header className="header-container" id="home">
      <section className="header--wrapper" style={{ marginTop: navHeight }}>
        {articlesDataList && (
          <>
            <h1>New and Upcoming</h1>
            <div className="header--article-container">
              <article className="header-article snap-inline">
                {articlesDataList &&
                  articlesDataList.map(
                    ({ id, image, title, date, content, editor, link }) => {
                      return (
                        <div
                          className="article--item"
                          key={id}
                          id={id}
                          onClick={() => {
                            handleOnClickArticle(
                              image,
                              title,
                              date,
                              content,
                              editor,
                              link
                            );
                          }}
                        >
                          <img src={image} alt="article" />
                          <div className="article-description--wrapper">
                            <div>
                              <h6>{title}</h6>
                              <small>
                                {dateFormat(
                                  date.substring(0, 10),
                                  "mmm dd, yyyy"
                                )}
                              </small>
                            </div>
                            <p>{content}</p>
                          </div>
                        </div>
                      );
                    }
                  )}
              </article>
              {/* NOTE: Visibility of the button Managed by combination of useRef(for immediate reaction) and useState(for observer) */}
              <button
                className={next}
                ref={nextButton}
                onClick={() => {
                  handleNext();
                }}
              >
                &#62;
              </button>
            </div>
          </>
        )}

        {trailersDataList && (
          <>
            <h2>Watch Trailers</h2>
            <div className="header--trailer-container">
              <article className="header-trailer snap-inline">
                {trailersDataList.map(({ id, link, description, provider }) => {
                  return (
                    <div className="trailer--item" key={id} id={id}>
                      {link.includes("https://www.youtube.com/embed/") ? (
                        <>
                          <img
                            src={thumbnail(link, "yt")}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={preview(id, "btn")}
                          />
                        </>
                      ) : (
                        <img
                          src={thumbnail(link, "dm")}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target={preview(id, "btn")}
                        />
                      )}
                      <div className="trailer-description--wrapper">
                        <p>{description}</p>
                        <div>{providerLogo(provider)}</div>
                      </div>
                      <div align="center">
                        <button
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target={preview(id, "btn")}
                        >
                          Watch
                        </button>
                      </div>
                      <div
                        className="modal fade"
                        id={preview(id, "view")}
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                          <div className="modal-content">
                            <div className="modal-body">
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                              {link.includes(
                                "https://www.youtube.com/embed/"
                              ) ? (
                                <>
                                  <iframe
                                    className="player"
                                    src={link}
                                    title={id}
                                  ></iframe>
                                </>
                              ) : (
                                <iframe
                                  className="player"
                                  src={dailymotionLink(link)}
                                ></iframe>
                              )}

                              <center>
                                <button
                                  className="btn btn-warning sub-btn"
                                  data-bs-dismiss="modal"
                                  onClick={() => {
                                    handleOnClickLogo(
                                      provider,
                                      Assets.VIU_BLACK
                                    );
                                  }}
                                >
                                  Subscribe Now
                                </button>
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </article>
              <button
                className={nextTrailer}
                ref={nextButtonTrailer}
                onClick={() => {
                  handleNextTrailer();
                }}
              >
                &#62;
              </button>
            </div>
          </>
        )}
      </section>
    </header>
  );
};

export default Header;
