import React, { useEffect, useRef, useState } from "react";
import { useNotesContext } from "../context/NoteContext";
import { FormateTime } from "../utils/functions";

const AudioBox = ({ src, index }) => {
  const audioRef = useRef(null);
  const seekbarRef = useRef(null);
  const durationRef = useRef(null);
  const [play, setPlay] = useState(false);
  const { notes, setNotes } = useNotesContext();

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

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlay(true);
    } else {
      audioRef.current.pause();
      setPlay(false);
    }
  };

  useEffect(() => {
    seekbarRef.current.style.background = `linear-gradient(to right, #579bc3 0%, #ccc 0%)`;

    // Update the seekbar value as the audio plays
    audioRef.current.addEventListener("timeupdate", function () {
      const currentAudioTime = audioRef.current.currentTime;
      const FormattedCurrentTime = FormateTime(currentAudioTime);
      seekbarRef.current.value = audioRef.current.currentTime;

      const progress =
        (seekbarRef.current.value / seekbarRef.current.max) * 100;
      seekbarRef.current.style.background = `linear-gradient(to right, #579bc3 ${progress}%, #ccc ${progress}%)`;
      durationRef.current.querySelector(".currentTime").innerHTML =
        FormattedCurrentTime;

      if (currentAudioTime === audioRef.current.duration) {
        seekbarRef.current.style.background = `linear-gradient(to right, #579bc3 0%, #ccc 0%)`;
        setPlay(false);
      }
    });

    // Update the audio's current time when the seekbar is changed
    seekbarRef.current.addEventListener("input", function (e) {
      audioRef.current.currentTime = seekbarRef.current.value;

      const progress = (e.target.value / seekbarRef.current.max) * 100;
      seekbarRef.current.style.background = `linear-gradient(to right, #579bc3 ${progress}%, #ccc ${progress}%)`;
    });

    // Update the seekbar's max value when metadata is loaded
    audioRef.current.addEventListener("loadedmetadata", function () {
      seekbarRef.current.max = audioRef.current.duration;

      const formattedDuration = FormateTime(audioRef.current.duration);
      durationRef.current.querySelector(".duration").innerHTML =
        formattedDuration;
    });
  }, []);

  return (
    <div className="audio-wrapper">
      <div className="custom-audio">
        <div className="audio-controls">
          <span className="audio-icon" onClick={togglePlay}>
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
                  stroke="#579BC3"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M15 5L15 19"
                  stroke="#579BC3"
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
                  fill="#579BC3"
                />
              </svg>
            )}
          </span>
          <div className="audio-seekbar">
            <input
              ref={seekbarRef}
              type="range"
              min="0"
              value="0"
              readOnly
              step="1"
            />
            <span className="duration-bar" ref={durationRef}>
              <span className="currentTime">00:00</span>
              <span className="duration"></span>
            </span>
          </div>
        </div>
        <audio controls={false} ref={audioRef}>
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioBox;
