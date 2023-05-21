// sidebar for small screen

import React, { useState } from 'react';
import "./SidePanel.css"

const SidePanel = ({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote, toggleNavbar, isOpen, setIsOpen }) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  return (
    <div className='sidepanel'>

      <div className="app-sidepanel">
        {isOpen && (
          <nav className="navbar-items">
            <div className="app-sidebar-header">
              <h2 className="app-logo pt-3">NOTEit</h2>
              <button className="fa fa-plus" onClick={onAddNote}></button>
              {/* <button class="fa fa-times" aria-hidden="true" onClick={toggleNavbar}></button> */}
            </div>
            <div className="app-sidebar-notes">
              {sortedNotes.map((note) => (
                <div
                  className={`app-sidebar-note ${note.id === activeNote && "active"}`}
                  onClick={() => { setActiveNote(note.id); }}
                >
                  <div className="sidebar-note-title">
                    {note.title}
                    <button
                      className="fa fa-trash "
                      onClick={() => {onDeleteNote(note.id)}}
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
  )
}

export default SidePanel;