import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");

  return (
    <NoteContext.Provider value={{ notes, setNotes, noteTitle, setNoteTitle }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotesContext = () => {
  const ctx = useContext(NoteContext);

  if (ctx) {
    return ctx;
  }

  return "Context is not initialized";
};
