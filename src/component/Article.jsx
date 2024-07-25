import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import "./article.css";
import { useAppContext } from "../context/Context";
import Axios from "axios";
import Nav from "./Nav";
import { useNavigate, useLocation } from "react-router-dom";
import EP from "./Endpoint";
import Assets from "./Assets";
import FooterHome from "./FooterHome";
import dateFormat from "dateformat";
import { RiShareForwardFill } from "react-icons/ri";
import { FaFacebookSquare, FaTwitter, FaViber } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  ViberShareButton,
} from "react-share";

const ValidateUrl = (callback = () => {}) => {
  const hasBeenCalled = useRef();
  if (hasBeenCalled.current) return;
  callback();
  hasBeenCalled.current = true;
};

const Article = () => {
  const { link } = useParams();
  // const getUrl = window.location.href;
  // const urlString = new URL(getUrl);
  // const urlSegment = urlString.pathname.split("/");
  const url = EP.SHARE_ARTICLE;

  const location = useLocation();
  const bgOpaque = false;
  const navigate = useNavigate();
  const [validUrl, setValidUrl] = useState(true);
  const [success, setSuccess] = useState(false);
  const { navHeight } = useAppContext();

  const [article, setArticle] = useState({
    image: location.state ? location.state.image : "",
    title: location.state ? location.state.title : "",
    date: location.state ? location.state.date : "",
    content: location.state ? location.state.content : "",
    editor: location.state ? location.state.editor : "",
    link: location.state ? location.state.link : "",
  });

  useEffect(() => {
    if (!validUrl && location.state === null) {
      navigate("/", {});
      return;
    } else if (location.state !== null) {
      setSuccess(true);
    }
  }, [validUrl, success, article]);

  const handleBackAction = () => {
    navigate("/", {});
  };

  const handleTwitterShare = (url, text) => {
    //forward?text=tests
    // window.open("viber://forward?text=tests", "noreferrer");
    window.open(
      "https://twitter.com/intent/tweet?url=" + url + "&text=" + text,
      "noreferrer"
    );
  };

  const getArticle = (link_) => {
    Axios.post(EP.GET_CERTAIN_ARTICLE, {
      link: link_,
    })
      .then((res) => {
        // console.log("Article " + JSON.stringify(res.data));
        if (res.data.status === "ok") {
          setSuccess(true);
          setArticle({
            image: res.data.article.image,
            title: res.data.article.title,
            date: res.data.article.date,
            content: res.data.article.content,
            editor: res.data.article.editor,
            link: res.data.article.link,
          });
        } else {
          setValidUrl(false);
        }
      })
      .catch((e) => {
        console.log("CATCH ARTICLE" + e);
      });
  };

  ValidateUrl(() => {
    if (
      // urlSegment[1].trim() === "article" &&
      // urlSegment[2].trim() !== "" &&
      link !== "" &&
      location.state === null
    ) {
      // getArticle(urlSegment[2].trim());
      getArticle(link);
      setValidUrl(true);
    }
  });

  return (
    <section className="article-container">
      <Nav bgOpaque={bgOpaque} />
      {success && (
        <div
          className="article-container--wrapper"
          style={{ marginTop: navHeight, paddingBottom: navHeight }}
        >
          <div className="cta-back" onClick={handleBackAction}>
            Back
          </div>
          <div className="article-content--wrapper">
            <h1>
              {article.title}
              <small>
                {article.editor} |{" "}
                {article.date
                  ? dateFormat(article.date.substring(0, 10), "mmm dd, yyyy")
                  : ""}
              </small>
            </h1>
            <div className="article--image-wrapper">
              <img src={article.image} />
            </div>
            <p>{article.content}</p>

            <article className="article--share">
              <small>Share</small>
              <div>
                {/* <RiShareForwardFill /> */}
                <FacebookShareButton url={url + article.link}>
                  <FaFacebookSquare />
                </FacebookShareButton>
                {/* <TwitterShareButton
                  title={article.title}
                  url={url + article.link}
                  // hashtag="#muo" */}
                {/* > */}
                <FaTwitter
                  onClick={() => {
                    handleTwitterShare(url + article.link, article.title);
                  }}
                ></FaTwitter>
                {/* </TwitterShareButton> */}
                <ViberShareButton url={url + article.link}>
                  <FaViber />
                </ViberShareButton>
              </div>
            </article>
          </div>
        </div>
      )}
      <FooterHome />
    </section>
  );
};

export default Article;
