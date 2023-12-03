import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotesContext } from "../context/NoteContext";
import TextBox from "../component/TextBox";
import ImageBox from "../component/ImageBox";
import VideoBox from "../component/VideoBox";
import AudioBox from "../component/AudioBox";
import { convertTimeIntoAMPM } from "../utils/functions";

const EditNote = () => {
  const { notes, setNotes, noteTitle, setNoteTitle } = useNotesContext();
  let params = useParams();
  const navigate = useNavigate();

  let currentDate = new Date();
  let formattedTime = convertTimeIntoAMPM(currentDate);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  });
  let formattedDate = formatter.format(currentDate);

  useEffect(() => {
    const localNotes = localStorage.getItem("notes");

    if (localNotes !== null) {
      const parsedLocalNotes = JSON.parse(localNotes)[params.noteId];
      setNoteTitle(parsedLocalNotes?.title);
      setNotes(parsedLocalNotes?.description);
    }

    return () => {
      setNoteTitle("");
      setNotes([]);
    };
  }, []);

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
        const currentNote = parsedLocalNotes[params.noteId];

        currentNote.title = noteTitle;
        currentNote.description = notes;
        currentNote.time = formattedTime;
        currentNote.date = formattedDate;
        const EditedNotes = [...parsedLocalNotes];

        localStorage.setItem("notes", JSON.stringify(EditedNotes));
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

  return (
    <section className="edit-note">
      <div className="container">
        {/* Heading part */}
        <div className="header-part">
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

export default EditNote;
