//TOP OF FILE
//This tells Next.js this component must run in the browser, because it uses:
// state (useState)
// refs (useRef)
// DOM APIs (FileReader)
// file uploads
// localStorage
// router navigation using useRouter
// So this component CANNOT be rendered on the server.
"use client";

import Header from "@/components/header/header"; //our custom top bar UI
import Link from "next/link"; // Next.js navigation
import React, { useState } from "react"; // track loading state 
import { useRef } from "react"; //get reference to the hidden file input 
import resultsStyle from "./results.css"; // applies CSS for this page
import { useRouter } from "next/navigation"; // redirect user after image analysis


const Results = () => {
  // COMPONENT START
  //Controls whether the page shows: the normal buttons, or
  //the "Preparing Your Analysis" loading screen.
  const [loading, setLoading] = useState(false);
  //Used for programmatic navigation: router.push("/AI.Analysis");
  const router = useRouter();
  //This points to the hidden <input type="file">,
  // allowing you to click it programmatically.
  const fileInputRef = useRef(null);

  // Trigger file input manually
  //The gallery button triggers this, 
  // so clicking the icon opens the file selector.
  const handleClick = () => {
    fileInputRef.current.click();
  };


//MAIN LOGIC: File Upload Handler
// Runs when the user selects a file.
  const handleFileChange = async (event) => {
    //1. Read the selected file
    const file = event.target.files[0];
    if (!file) {
      alert("Please upload an Image");
      return;
    }
//2. Set loading state to Shows the “Preparing Your Analysis” screen.
    setLoading(true);

    //3. Convert the image to Base64
    //This is important because the API 
    // expects an image string, not a raw file.
    try {

      const toBase64 = (file) =>
        new Promise((resolve, reject) => {

          //FileReader reads the file as a Data URL((data:image/png;base64,xxxxx…))
          const reader = new FileReader();
          reader.readAsDataURL(file);
          //.split(",")[1] removes the prefix data:image/...;base64,
          //You keep only the Base64 data
         
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
        });
// Now we have a clean Base64 string to send to your API.
      const base64String = await toBase64(file);

      //4. Prepare payload for API because The server wants:
//       {
//   "image": "base64STRING..."
// }
      const payload = {
        image: base64String,
      };

      //5. Send the image to your backend (Phase 2 API)
      //NB: await waits for the API response
      const res = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          //Makes a POST request to Sends Base64-encoded image
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          //Includes JSON body
          body: JSON.stringify(payload),
        }
      );

      // 6. Parse server response
      //This extracts the backend’s results—could contain:
      // skin analysis
      // detected features
      // scores
      // recommendations
      // etc.
      const data = await res.json();
      //7. Save results to localStorage:
      // we store data in localStorage so 
      // the next page (/AI.Analysis) can read it. This avoids using global state or passing props.
      localStorage.setItem("analysisResults", JSON.stringify(data));
//8. Notify user + navigate: So user sees a message, then 
// gets redirected to the next page.
      alert("Image analyzed successfully");
      router.push("/AI.Analysis");
      console.log("API response:", data);
      // 9. Error handling: If anything fails, it logs the issue.
    } catch (error) {
      console.error("Upload error:", error);
      // 10. Always turn off loading:
      //The loading screen disappears whether:
      // upload worked
      // upload failed
      // user canceled
    } finally {
      setLoading(false);
    }
  };

  //UI / JSX
  return (
    <div id="results">
      <Header section="Intro" />
      <div className="resultsContainer">
        <p className="resultsTitle uppercase">To start analysis</p>
        
        {!loading ? (
          
          <>
          {/* If NOT loading → show camera + gallery upload */}

            <div className="resultsMiddle">
                {/* Camera icon → opens camera capture page */}
              <Link href="/camera/capture" className="cameraButton">
                <img src="/camera.png" />
              </Link>
                 {/* Gallery icon → opens file selector */}
              <button className="galleryButton" onClick={handleClick}>
                <img src="/gallery.png" />
              </button>
               {/* Hidden input is triggered automatically */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

            </div>
          </>
        ) : (
          // If loading → show loading UI
          <div className="resultsLoadingState">
            <img className="rombuses" src="/rombuses.png" />
            <h3>Preparing Your Analysis</h3>
          </div>
        )}

        {/* Back Button */}
        <Link href="/Test" className="startButton uppercase">
          <img className="arrowIcon" src="/button-icon-shrunk.png" />
          Back
        </Link>
      </div>
    </div>
  );
};

export default Results;
