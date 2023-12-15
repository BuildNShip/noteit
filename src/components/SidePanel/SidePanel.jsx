// sidebar for small screen

import React, { useState } from "react";
import "./SidePanel.css";

const SidePanel = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  toggleNavbar,
  isOpen,
  setIsOpen,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const handleDeleteNote = (noteId, event) => {
    event.stopPropagation();
    onDeleteNote(noteId);
  };
  return (
    <div className="sidepanel">
      <div className="app-sidepanel">
        {isOpen && (
          <nav className="navbar-items">
            <div className="app-sidebar-header">
              <h2 className="app-logo pt-3">NOTEit</h2>
              <button
                className="fa fa-plus"
                onClick={() => {
                  onAddNote();
                  toggleNavbar();
                }}
              ></button>
              {/* <button class="fa fa-times" aria-hidden="true" onClick={toggleNavbar}></button> */}
            </div>
            <div className="app-sidebar-notes">
              {sortedNotes.map((note) => (
                <div
                  className={`app-sidebar-note ${
                    note.id === activeNote && "active"
                  }`}
                  onClick={() => {
                    toggleNavbar();
                    setActiveNote(note.id);
                  }}
                >
                  <div className="sidebar-note-title">
                    <button
                      class="note-title"
                      onClick={() => {
                        setActiveNote(note.id);
                      }}
                    >
                      {note.title}
                    </button>
                    <button
                      className="fa fa-trash "
                      onClick={
                        // onDeleteNote(note.id);}}
                        (event) => handleDeleteNote(note.id, event)
                      }
                    ></button>
                  </div>
                  <small className="note-meta">
                    {" "}
                    {new Date(note.lastModified).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </small>
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
