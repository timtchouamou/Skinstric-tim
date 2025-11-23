import React from "react";
import landingPageStyles from "./landingPage.css";
import Header from "../../components/header/header";
import Link from "next/link";
import test from "../Test/page";

const LandingPage = () => {
  return (
    <div id="landingPage">
      <Header section="Intro" />
      <div className="landingContainer">
        <div className="landingMain">
          <div className="landingLeft">
            <button className="option leftOption uppercase">
              <img className="arrowIcon" src="/button-icon-shrunk.png" />
              Discover A.I.
            </button>
            <img className="rectangle leftRectangle" src="/RectangleLeft.png" />
          </div>
          <div className="landingMiddle">
            <h1 className="title">Sophisticated skincare</h1>
          </div>
          <div className="landingRight">
            <img className="rectangle rightRectangle" src="/RectangleRight.png" />
            <Link href='/Test' className="option rightOption uppercase">Take Test
              <img className="arrowIcon arrowFlipped" src="/button-icon-shrunk.png" />
            </Link>
          </div>
        </div>
        <div className="landingBottom">
          <p className="landingPara uppercase">
            Skinstric developed an A.I. that creates a highly-personalised
            routine tailored to what your skin needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
