import React from "react";
import analysisStyle from "./analysis.css";
import Header from "@/components/header/header";
import Link from "next/link";

const Analysis = () => {
  return (
    <div id="analysis">
      <Header section="Analysis" />
      <div className="analysisContainer">
        <div className="analysisTop">
          <p className="title uppercase">A.I. Analysis</p>
          <p className="uppercase">A. I. Has Estimated the following.</p>
          <p className="uppercase">Fix Estimated information if needed.</p>
        </div>
        <div className="analysisMiddle">
          <div className="diamondWrapper">
            <img className="rombuses analysisRombuses" src="/rombuses.png" />
            <Link href="/Summary" className="diamond diamondTop">
              <span>DEMOGRAPHICS</span>
            </Link>
            <button className="diamond diamondLeft">
              <span>SKIN TYPE DETAILS</span>
            </button>
            <button className="diamond diamondRight">
              <span>COSMETIC CONCERNS</span>
            </button>
            <button className="diamond diamondBottom">
              <span>WEATHER</span>
            </button>
          </div>
        </div>
        <div className="analysisBottom">
          <Link href="/Results" className="startButton uppercase">
            <img className="arrowIcon" src="/button-icon-shrunk.png" />
            Back
          </Link>
          <Link href="/Summary" className="startButton uppercase">
            Get Summary
            <img
              className="arrowIcon arrowFlipped"
              src="/button-icon-shrunk.png"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
