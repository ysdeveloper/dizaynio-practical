import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageBox from "../component/ImageBox";
import { useNotesContext } from "../context/NoteContext";
import VideoBox from "../component/VideoBox";
import AudioBox from "../component/AudioBox";
import { convertTimeIntoAMPM } from "../utils/functions";
import TextBox from "../component/TextBox";

const AddNewNote = () => {
  const navigate = useNavigate();
  const { notes, setNotes, noteTitle, setNoteTitle } = useNotesContext();

  let currentDate = new Date();
  let formattedTime = convertTimeIntoAMPM(currentDate);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  });
  let formattedDate = formatter.format(currentDate);

  const handleAddMedia = (e, type) => {
    const reader = new FileReader();
    const media = e.target.files[0];

    if (media) {
      reader.readAsDataURL(media);
    }

    reader.addEventListener("load", function () {
      setNotes([
        ...notes,
        {
          type,
          src: reader.result,
        },
      ]);
    });
  };

  const handleDeleteMedia = (index) => {
    notes?.splice(index, 1);
    setNotes([...notes]);
  };

  const handleSave = () => {
    if (noteTitle !== "" && notes.length !== 0) {
      const localNotes = localStorage.getItem("notes");

      if (localNotes !== null) {
        const parsedLocalNotes = JSON.parse(localNotes);
        const lastNoteId = parsedLocalNotes.slice(-1)[0].id;

        const noteData = [
          ...parsedLocalNotes,
          {
            id: lastNoteId + 1,
            title: noteTitle,
            description: notes,
            time: formattedTime,
            date: formattedDate,
          },
        ];
        localStorage.setItem("notes", JSON.stringify(noteData));
      } else {
        const notesData = [
          {
            id: 0,
            title: noteTitle,
            description: notes,
            time: formattedTime,
            date: formattedDate,
          },
        ];
        localStorage.setItem("notes", JSON.stringify(notesData));
      }
      setNoteTitle("");
      setNotes([]);
      navigate("/");
    } else {
      alert("Note Title or Note description is empty");
    }
  };

  const handleBlur = (e) => {
    if (e.target.value !== "") {
      setNotes([
        ...notes,
        {
          type: "text",
          src: e.target.value,
        },
      ]);

      e.target.value = "";
    }
  };

  useEffect(() => {
    return () => {
      // const userConfirm = window.confirm("Do you want to proceed?");
      // if (userConfirm) {
      //   setNoteTitle("");
      //   setNotes([]);
      //   navigate(-1);
      // } else {
      //   navigate(1);
      // }
      setNoteTitle("");
      setNotes([]);
    };
  }, []);

  return (
    <section className="add-new-note">
      <div className="container">
        {/* Heading part */}
        <div className="header-part">
          <div className="back-btn" onClick={() => navigate(-1)}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29289 11.2929C1.90237 11.6834 1.90237 12.3166 2.29289 12.7071L8.65685 19.0711C9.04738 19.4616 9.68054 19.4616 10.0711 19.0711C10.4616 18.6805 10.4616 18.0474 10.0711 17.6569L4.41421 12L10.0711 6.34315C10.4616 5.95262 10.4616 5.31946 10.0711 4.92893C9.68054 4.53841 9.04738 4.53841 8.65685 4.92893L2.29289 11.2929ZM21 13C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11V13ZM3 13H21V11H3V13Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="btn save-btn" onClick={handleSave}>
            save
          </div>
        </div>

        {/* Editing part */}
        <div className="editing-part">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          {notes?.map((item, i) => {
            if (item.type === "text") {
              return <TextBox key={i} index={i} src={item.src} />;
            }

            if (item.type === "image") {
              return (
                <ImageBox
                  key={i}
                  index={i}
                  src={item.src}
                  onDelete={() => handleDeleteMedia(i)}
                  handleAddMedia={(e) => handleAddMedia(e, "image")}
                />
              );
            }

            if (item.type === "video") {
              return (
                <VideoBox
                  key={i}
                  index={i}
                  src={item.src}
                  onDelete={() => handleDeleteMedia(i)}
                  handleAddMedia={(e) => handleAddMedia(e, "image")}
                />
              );
            }

            if (item.type === "audio") {
              return (
                <AudioBox
                  key={i}
                  index={i}
                  src={item.src}
                  onDelete={() => handleDeleteMedia(i)}
                  handleAddMedia={(e) => handleAddMedia(e, "image")}
                />
              );
            }
          })}
          <textarea
            onBlur={handleBlur}
            placeholder="Start Typing..."
          ></textarea>

          <div className="edit-box">
            <div className="box">
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={(e) => handleAddMedia(e, "image")}
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
                onChange={(e) => handleAddMedia(e, "video")}
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
                onChange={(e) => handleAddMedia(e, "audio")}
              />
              <img
                src="/assets/mic.svg"
                height={24}
                width={24}
                alt="mic-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNewNote;
