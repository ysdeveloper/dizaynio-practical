import { Link } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { convertTimeIntoAMPM } from "./utils/functions";

function App() {
  const [Notes, setNotes] = useState();
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
      const parsedLocalNotes = JSON.parse(localNotes);
      setNotes(parsedLocalNotes);
    } else {
      const notesData = [
        {
          id: 0,
          title: "First Post",
          description: [],
          time: formattedTime,
          date: formattedDate,
        },
      ];
      localStorage.setItem("notes", JSON.stringify(notesData));
      setNotes(notesData);
    }
  }, []);

  return (
    <section>
      <div className="container">
        <div className="header">
          <h1>Notes</h1>
          <Link to="/new-note" className="button">
            <span className="plus">+</span> new
          </Link>
        </div>
        <ul className="note-list">
          {Notes?.map((item, i) => {
            return (
              <li key={item.id}>
                <Link to={`note/${i}`} className="note-card">
                  <h2 className="title">{item.title}</h2>
                  {item.description[0]?.type === "text" && (
                    <p>{item.description[0].src}</p>
                  )}
                  <span className="date-time">
                    <span className="time">{item.time}</span>
                    <span className="date">{item.date}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="footer">
          <Link to="/new-note" className="button">
            <span className="plus">+</span> new
          </Link>
        </div>
      </div>
    </section>
  );
}

export default App;
