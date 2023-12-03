import React, { useRef } from "react";
import { useNotesContext } from "../context/NoteContext";
import { useAutosizeTextArea } from "../utils/functions";

const TextBox = ({ src, index }) => {
  const { notes, setNotes } = useNotesContext();
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, notes[index].src);

  const handleChangeText = (e) => {
    notes[index].src = e.target.value;
    setNotes([...notes]);
  };

  return (
    <textarea
      ref={textAreaRef}
      onChange={(e) => handleChangeText(e)}
      value={src}
    />
  );
};

export default TextBox;
