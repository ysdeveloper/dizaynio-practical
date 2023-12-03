import React, { useEffect, useRef, useState } from "react";
import { useNotesContext } from "../context/NoteContext";

const VideoBox = ({ src, onDelete, index }) => {
  const { notes, setNotes } = useNotesContext();
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const videoRef = useRef(null);

  const toggleVideoPlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlay(true);
    } else {
      videoRef.current.pause();
      setPlay(false);
    }
  };

  const handleChangeMedia = (e, type) => {
    const reader = new FileReader();
    const media = e.target.files[0];

    if (media) {
      reader.readAsDataURL(media);
    }

    reader.addEventListener("load", function () {
      notes[index].type = type;
      notes[index].src = reader.result;
      setNotes([...notes]);
    });
  };

  useEffect(() => {
    videoRef.current.addEventListener("loadedmetadata", function () {
      const videoDuration = videoRef.current.duration;
      const minutes = Math.floor(videoDuration / 60);
      const seconds = Math.floor(videoDuration % 60);

      // Format minutes and seconds with leading zeros
      const formattedDuration = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      setDuration(formattedDuration);
    });
  }, []);

  return (
    <div className="video-wrapper">
      <div className="del-icon" onClick={onDelete}>
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3.5H12C12 2.96957 11.7893 2.46086 11.4142 2.08579C11.0391 1.71071 10.5304 1.5 10 1.5C9.46957 1.5 8.96086 1.71071 8.58579 2.08579C8.21071 2.46086 8 2.96957 8 3.5ZM6.5 3.5C6.5 3.04037 6.59053 2.58525 6.76642 2.16061C6.94231 1.73597 7.20012 1.35013 7.52513 1.02513C7.85013 0.700121 8.23597 0.442313 8.66061 0.266422C9.08525 0.0905302 9.54037 0 10 0C10.4596 0 10.9148 0.0905302 11.3394 0.266422C11.764 0.442313 12.1499 0.700121 12.4749 1.02513C12.7999 1.35013 13.0577 1.73597 13.2336 2.16061C13.4095 2.58525 13.5 3.04037 13.5 3.5H19.25C19.4489 3.5 19.6397 3.57902 19.7803 3.71967C19.921 3.86032 20 4.05109 20 4.25C20 4.44891 19.921 4.63968 19.7803 4.78033C19.6397 4.92098 19.4489 5 19.25 5H17.93L16.76 17.111C16.6702 18.039 16.238 18.9002 15.5477 19.5268C14.8573 20.1534 13.9583 20.5004 13.026 20.5H6.974C6.04186 20.5001 5.1431 20.153 4.45295 19.5265C3.7628 18.8999 3.33073 18.0388 3.241 17.111L2.07 5H0.75C0.551088 5 0.360322 4.92098 0.21967 4.78033C0.0790175 4.63968 0 4.44891 0 4.25C0 4.05109 0.0790175 3.86032 0.21967 3.71967C0.360322 3.57902 0.551088 3.5 0.75 3.5H6.5ZM8.5 8.25C8.5 8.05109 8.42098 7.86032 8.28033 7.71967C8.13968 7.57902 7.94891 7.5 7.75 7.5C7.55109 7.5 7.36032 7.57902 7.21967 7.71967C7.07902 7.86032 7 8.05109 7 8.25V15.75C7 15.9489 7.07902 16.1397 7.21967 16.2803C7.36032 16.421 7.55109 16.5 7.75 16.5C7.94891 16.5 8.13968 16.421 8.28033 16.2803C8.42098 16.1397 8.5 15.9489 8.5 15.75V8.25ZM12.25 7.5C12.4489 7.5 12.6397 7.57902 12.7803 7.71967C12.921 7.86032 13 8.05109 13 8.25V15.75C13 15.9489 12.921 16.1397 12.7803 16.2803C12.6397 16.421 12.4489 16.5 12.25 16.5C12.0511 16.5 11.8603 16.421 11.7197 16.2803C11.579 16.1397 11.5 15.9489 11.5 15.75V8.25C11.5 8.05109 11.579 7.86032 11.7197 7.71967C11.8603 7.57902 12.0511 7.5 12.25 7.5ZM4.734 16.967C4.78794 17.5236 5.04724 18.0403 5.46137 18.4161C5.87549 18.792 6.41475 19.0001 6.974 19H13.026C13.5853 19.0001 14.1245 18.792 14.5386 18.4161C14.9528 18.0403 15.2121 17.5236 15.266 16.967L16.424 5H3.576L4.734 16.967Z"
            fill="#D75454"
          />
        </svg>
      </div>

      <span className="video-controls">
        <span className="video-icon" onClick={toggleVideoPlay}>
          {play ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 5L8 19"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M15 5L15 19"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z"
                fill="white"
              />
            </svg>
          )}
        </span>
        <span className="video-duration">{duration}</span>
      </span>
      <video src={src} ref={videoRef} controls={false} />

      <div className="edit-box">
        <div className="box">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={(e) => handleChangeMedia(e, "image")}
          />
          <img
            src="/assets/image.svg"
            height={24}
            width={24}
            alt="image-icon"
          />
        </div>
        <div className="box">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="video/*"
            onChange={(e) => handleChangeMedia(e, "video")}
          />
          <img
            src="/assets/camera.svg"
            height={25}
            width={25}
            alt="camera-icon"
          />
        </div>
        <div className="box">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="audio/*"
            onChange={(e) => handleChangeMedia(e, "audio")}
          />
          <img src="/assets/mic.svg" height={24} width={24} alt="mic-icon" />
        </div>
      </div>
    </div>
  );
};

export default VideoBox;
