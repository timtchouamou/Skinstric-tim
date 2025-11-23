"use client";

import React, { useEffect, useState } from "react";
import summaryStyle from "./summary.css";
import Header from "@/components/header/header";
import Link from "next/link";

const Summary = () => {
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [optionsData, setOptionsData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const percentage = selectedOption?.percentage || 0;
  const radius = 190;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  useEffect(() => {
    if (optionsData[selectedCategory]?.length > 0) {
      setSelectedOption(optionsData[selectedCategory][0]);
    }
  }, [selectedCategory, optionsData]);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResults");
    if (!stored) return;

    const parsed = JSON.parse(stored);

    const convertObjectToArray = (obj) => {
      if (!obj) return [];
      return Object.entries(obj).map(([key, value]) => ({
        label: key,
        percentage: Math.round(parseFloat(value) * 100),
      }));
    };

    const formatted = {
      race: convertObjectToArray(parsed.data?.race),
      age: convertObjectToArray(parsed.data?.age),
      sex: convertObjectToArray(parsed.data?.gender),
    };
    setOptionsData(formatted);
  }, []);

  const capitalize = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div id="summary">
      <Header section="Analysis" />
      <div className="summaryContainer">
        <div className="summaryTop">
          <p className="title uppercase">A.I. Analysis</p>
          <h1 className="uppercase">demographics</h1>
          <p className="predicted uppercase">Predicted race & age</p>
        </div>
        <div className="summaryMiddle">
          <div className="summaryMidLeft">
            <button
              className="button race"
              onClick={() => setSelectedCategory("race")}
            >
              <p className="raceResult">
                {capitalize(optionsData.race?.[0]?.label || "--")}
              </p>
              <p className="uppercase">Race</p>
            </button>
            <button
              className="button age"
              onClick={() => setSelectedCategory("age")}
            >
              <p className="ageResult">{optionsData.age?.[0]?.label || "--"}</p>
              <p className="uppercase">Age</p>
            </button>
            <button
              className="button sex"
              onClick={() => setSelectedCategory("sex")}
            >
              <p className="sexResult">
                {capitalize(optionsData.sex?.[0]?.label || "--")}
              </p>
              <p className="uppercase">Sex</p>
            </button>
          </div>
          <div className="summaryMidCenter">
            <h1 className="resultLabelLarge">
              {capitalize(selectedOption?.label || "")}
            </h1>
            <div className="graphWrapper">
            <div className="graph">
              <svg className="progressRing" width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                <circle
                  className="progressRing-bg"
                  cx="200"
                  cy="200"
                  r={normalizedRadius}
                  width={strokeWidth}
                />
                <circle
                  className="progressRing-fg"
                  cx="200"
                  cy="200"
                  r={normalizedRadius}
                  width={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="graphText">{percentage}%</div>
            </div>
            </div>
          </div>
          <div className="summaryMidRight">
            <div className="rightTitle">
              <p className="uppercase">{selectedCategory}</p>
              <p className="uppercase">A.I. confidence</p>
            </div>
            <div className="resultsList">
              <div className="listExplanations">
                {optionsData[selectedCategory]
                  ?.slice()
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((option, idx) => (
                    <div key={idx} className={`listExplanation ${selectedOption?.label === option.label ? "active" : ""}`} onClick={() => setSelectedOption(option)}>
                        <input
                          className="radio"
                          type="radio"
                          name="option"
                          id={`option-${selectedCategory}-${idx}`}
                          checked={selectedOption?.label === option.label}
                          onChange={() => setSelectedOption(option)}
                        />
                        <span className="diamondRadio"></span>
                        <h1 className="resultLabel">
                          {capitalize(option.label)}
                        </h1>                    
                      <p className="percentage">{option.percentage}%</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="summaryBottom">
          <Link href="/AI.Analysis" className="startButton uppercase">
            <img className="arrowIcon" src="/button-icon-shrunk.png" />
            Back
          </Link>
          <p>
            <span className="gray">
              If A.I. estimate is wrong, select the correct one.
            </span>
          </p>
          <Link href="/" className="startButton uppercase">
            Home
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

export default Summary;
