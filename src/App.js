import { useState, useEffect } from "react";
import "./App.css";
import uuid from "react-uuid";
import styles from "./Footer.css";
import { FiCopy } from "react-icons/fi";
import { FaInstagram, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa";
import Sidebar from "./Sidebar";
import BuildNShip from "./BuildNShip.png";
import Main from "./Main";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [activeNote, setActiveNote] = useState(false);




  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled note",
      body: "Write your note here",
      lastModified: Date.now(),
      fontSize:14,
      textCase:''
    };

    setNotes([newNote, ...notes]);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNotes = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />

      <Main activeNote={getActiveNote()} onUpdateNotes={onUpdateNotes} />

      <div className="footer">
        <a href="https://buildnship.in/">
          <img src={BuildNShip} alt="logo" />
        </a>
        <div className={styles.social_container}>
          <a href="https://twitter.com/buildnship/">
            <FaTwitter size={25} color="white" />
          </a>
          <a href="https://instagram.com/buildnship?igshid=YmMyMTA2M2Y=">
            <FaInstagram size={25} color="white" />
          </a>
          <a href="https://github.com/BuildNShip">
            <FaGithub size={25} color="white" />
          </a>
          <a href="https://t.me/buildnship">
            <FaTelegram size={25} color="white" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;