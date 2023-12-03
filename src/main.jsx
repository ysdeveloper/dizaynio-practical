import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddNewNote from "./pages/AddNewNote.jsx";
import { NoteContextProvider } from "./context/NoteContext";
import EditNote from "./pages/EditNote.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/new-note",
    element: <AddNewNote />,
  },
  {
    path: "/note/:noteId",
    element: <EditNote />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <NoteContextProvider>
    <RouterProvider router={router} />
  </NoteContextProvider>
);
