"use client";

import React, { useEffect, useState } from "react";
import testStyles from "./test.css";
import Header from "@/components/header/header";
import Link from "next/link";

const Test = () => {
  const [phase, setPhase] = useState("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  // updates the input value depending on the phase
  //This function runs every time the user types in the input box.
  const handleInput = (event) => {
    if (phase === "name") {
      //update the name state
      setName(event.target.value);
    } else {
      // update the location state
      setLocation(event.target.value);
    }
  };
//handles Enter key submission
//This function runs whenever the user presses a key in the input box.
  const handleKeyDown = async (event) => {
    //“If the key pressed is NOT Enter → stop and do nothing.”
    if (event.key !== "Enter") return;

    if (phase === "name") {
      //If name is empty, do nothing
      //This prevents continuing if the input is blank.
      if (name.trim().length === 0) return;
      //Otherwise switch to the next step
      setPhase("location");
      return;
    }

    if (phase === "location") {
      if (location.trim().length === 0) return;

      setLoading(true);
      setFinished(false);

// 1- try { ... } catch (error) { ... } This structure is used to:
// try to run a piece of code that might fail
// catch any error that occurs (network errors, server errors, etc.)
// It prevents your app from crashing.

      try {
        //2. The fetch API call
        //(1) Sends a request to our Cloud Function
        await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            //(2) Uses POST method: we are sending data TO the server.
            method: "POST",
            //(3) Sets the request headers: "The data I'm sending is in JSON format."
            headers: {
              "Content-Type": "application/json",
            },
            //(4) Sends the data: convert for example { name: "Tim", location: "USA" }
            // into into JSON text:"{\"name\":\"Tim\",\"location\":\"USA\"}"
            //because HTTP only sends strings, not JavaScript objects.
            body: JSON.stringify({ name, location }),
          }
        );
//(5) await waits until the server responds
//The await fetch() pauses the code until:
//the request is fully sent
//the server processes it
//a response comes back
//If the server errors → it jumps to the catch.

//3. Delay for smoother user experience
//This line simply waits 700 milliseconds before continuing.
//Why delay?
// To give a smoother “Processing…” animation
// To prevent instant flash transitions
// To make the experience feel deliberate
// This is not required for functionality — it’s strictly for UX.
        await new Promise((res) => setTimeout(res, 700));

        //4. Turn off loading and show success
        setLoading(false); // loading spinner disappears
        setFinished(true); // thank-you message appears and Next button becomes visible

        //5. If anything goes wrong → Catch block
        // If an exception happens (e.g., no internet, server error):
//Loading is turned off
//Finished stays false
//No success message is shown
//No crash happens
//This is graceful error handling.
      } catch (error) {
        setLoading(false);
      }
    }
  };


  const handleLoading = () => {
    setLoading(true);
  };

  return (
    <div id="testPage">
      <Header section="Test"/>
      <div className="testContainer">
        <p className="testTitle uppercase">To Start Analysis</p>
        <div className="testMiddle">
          <img className="rombuses" src="/rombuses.png" />
          <div className="middleText">

            {loading ? (
              <p className="loadingText uppercase">Processing</p>
            ) : finished ? (
              <p className="thankYouText">
                Thank you!
                <br/>
                 Proceed to the next step!
              </p>
            ) : (
              <>
                <p className="uppercase">
                  <span className="gray clickToType">Click to type</span>
                </p>
                <input
                  className="nameInput"
                  type="text"
                  value={phase === "name" ? name : location}
                  placeholder={
                    phase === "name"
                      ? "Introduce Yourself"
                      : "Where are you from?"
                  }
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}

          </div>
        </div>

        <div className="buttons">
          <Link href="/" className="startButton uppercase">
            <img className="arrowIcon" src="/button-icon-shrunk.png" />
            Back
          </Link>
          {finished && (
            <Link href="/Results" className="startButton uppercase">
              Proceed
              <img
                className="arrowIcon arrowFlipped"
                src="/button-icon-shrunk.png"
              />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Test;
