"use client";

import React, { useEffect, useRef, useState } from "react";
import cameraStyle from "./camera.css";
import Header from "@/components/header/header";
import Link from "next/link";
import { useRouter } from "next/navigation";

const camera = () => {
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const router = useRouter()

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      setCameraActive(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(console.error);
          };
        }
      }, 50);
    } catch (err) {
      console.error("Camera access denied or unavailable:", err);
      alert(
        "Unable to access camera. Please allow camera access or use gallery."
      );
    }
  };

  useEffect(() => {
    handleCameraClick();
  }, []);

  const handleTakePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setPhotoDataUrl(dataUrl);
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleCancel = () => {
    stopCamera();
    setPhotoDataUrl(null);
    setCameraActive(false);
    setLoading(false);
  };

  const handleRetake = () => {
    setPhotoDataUrl(null);
    handleCameraClick();
  };

  const handleAccept = async () => {
    if (!photoDataUrl) return;
    const base64String = photoDataUrl.split(",")[1];
    await processFile(
      new File(
        [Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0))],
        "photo.jpg",
        { type: "image/jpeg" }
      )
    );
  };

  const processFile = async (file) => {
    setLoading(true);
    try {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
        });

      const base64String = await toBase64(file);
      const payload = { image: base64String };

      const res = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      localStorage.setItem("analysisResults", JSON.stringify(data));
      router.push("/AI.Analysis");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to analyze image.");
    } finally {
      setLoading(false);
      setCameraActive(false);
      setPhotoDataUrl(null);
    }
  };

  return (
    <div id="camera">
      <Header section="Intro" />
      <div className="cameraContainer">
        {cameraActive && (
          <div className="cameraPopup">
            <video
              className="video"
              ref={videoRef}
              autoPlay
              playsInline
              muted
            />
            <div className="videoButtons">
              <button className="videoButton" onClick={handleTakePhoto}>
                Take Photo
                <img src="/cameraIcon.png" />
              </button>
            </div>
          </div>
        )}
        {photoDataUrl && (
          <div className="photoReviewPopup">
            <img className="photoReview" src={photoDataUrl} alt="Preview" />
            <button className="retake" onClick={handleRetake}>
              Retake
            </button>
          </div>
        )}
        {loading && (
          <div className="resultsLoadingState">
            <img className="rombuses" src="/rombuses.png" />
            <h3>Preparing Your Analysis</h3>
          </div>
        )}
          <div className="cameraBottom">
            <div className="bottomLeft">
            <Link
              href="/Results"
              className="startButton uppercase"
              onClick={handleCancel}
            >
              <img className="arrowIcon" src="/button-icon-shrunk.png" />
              Back
            </Link>
            </div>
            <div className="bottomMid">
              <p className="uppercase">
                To get better results, make sure to have
              </p>
              <ol>
                <li className="uppercase">neutral expression</li>
                <li className="uppercase">frontal pose</li>
                <li className="uppercase">adequate lighting</li>
              </ol>
              </div>
              <div className="bottomRight">
          {photoDataUrl && (
              <Link
                href="/AI.Analysis"
                onClick={handleAccept}
                className="proceed startButton uppercase"
              >
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
      </div>
  );
};

export default camera;
