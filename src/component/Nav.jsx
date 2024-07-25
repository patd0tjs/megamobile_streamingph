import React, { useState, useEffect, useRef } from "react";
import "./nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Context";
import Assets from "./Assets";
import { RxHamburgerMenu } from "react-icons/rx";

const Nav = (props) => {
  const bgOpaque = props.bgOpaque;
  const navi = useRef(); //

  const [active, setActive] = useState("#");
  const [menuContainer, setMenuContainer] = useState("menu-container hidden");
  const [isMenuClicked, setMenuClicked] = useState(false);

  const navigate = useNavigate();
  const { navHeight, setNavHeight, setVendor } = useAppContext();

  const handleOnClick = () => {
    navigate("/", {});
  };

  useEffect(() => {
    if (!navi.current) return; // MustCheck: wait for the elementRef to be available
    const resizeObserver = new ResizeObserver(() => {
      //Still check navi.current sometimes null after setState
      if (navi.current) setNavHeight(navi.current.clientHeight);
    });
    //Still check navi.current sometimes null after setState
    if (navi.current) resizeObserver.observe(navi.current);
    //What to observe
    return () => resizeObserver.disconnect(); // MustClean up after
  }, [navHeight]);

  const navTab = () => {
    return (
      <React.Fragment>
        <a href="#home" onClick={handleOnClick}>
          Home
        </a>
        <a href="#subscribe" onClick={handleOnClick}>
          Subscribe
        </a>
        <a href="#faqs" onClick={handleOnClick}>
          FAQs
        </a>

        <Link to="/redeem" id="claim" onClick={handleOnClick}>
          <span id="claim_label">Claim Your Free Pin</span>
        </Link>
      </React.Fragment>
    );
  };

  const toggleShow = () => {
    if (!isMenuClicked) {
      setMenuContainer("menu-container visible");
      setMenuClicked(true);
    } else {
      setMenuContainer("menu-container hidden");
      setMenuClicked(false);
    }
  };
  return (
    <>
      <nav className={bgOpaque ? "nav-opaque" : "nav-translucent"} ref={navi}>
        <div className="nav--wrapper">
          <img src={Assets.MAIN_LOGO} alt="logo" />
          <Link to="/redeem" id="claim_phone" onClick={handleOnClick}>
            <span id="claim_label_phone">Claim Your Free Pin</span>
          </Link>
          <div className="tab-nav--wrapper">{navTab()}</div>
          <div className="burger-wrapper" onClick={toggleShow}>
            <RxHamburgerMenu color="white" />
          </div>
        </div>
      </nav>
      <section className={menuContainer} onClick={toggleShow}>
        <div className="menu-item">{navTab()}</div>
      </section>
    </>
  );
};

export default Nav;
