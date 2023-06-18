import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from "react-bootstrap/Dropdown";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import SidePanel from "../SidePanel/SidePanel";
import "./Main.css";

const Main = ({ activeNote, onUpdateNotes ,onAddNote ,toggleNavbar, isOpen}) => {
  const [textCase, setTextCase] = useState("titlecase");
  const [fontSize, setFontSize] = useState(14);
  const [copyStatus, setCopyStatus] = useState("copy");

  const content = useRef(null);
  const isMobile = window.innerWidth <= 900;

  const toTitleCase = () => {
    let input = activeNote.body;
    let output = input
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (s) => s.toUpperCase());
    return output;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeNote.body);
    setCopyStatus("copied!");
    setTimeout(() => {
      setCopyStatus("copy");
    }, 2000);
  };

  const onEditField = (key, val, fsize, fcase) => {
    onUpdateNotes({
      ...activeNote,
      [key]: val,
      lastModified: Date.now(),
      fontSize: fsize,
      textCase: fcase,
    });
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    onUpdateNotes({
      ...activeNote,
      fontSize: size,
      lastModified: Date.now(),
    });
  };

  const handleTextCaseChange = (caseType) => {
    if (caseType === "titlecase") {
      caseType = "none";
      setTextCase(caseType);
      //console.log(content.current.id, content.value);
      content.current.value = toTitleCase(activeNote.body);
      onUpdateNotes({
        ...activeNote,
        body: content.current.value,
        textCase: caseType,
        lastModified: Date.now(),
      });
      setTextCase('titlecase');
    } else {
      setTextCase(caseType);
      onUpdateNotes({
        ...activeNote,
        textCase: caseType,
        lastModified: Date.now(),
      });
    }
    
  };

  if (!activeNote) return <div className="no-active-note">No Selected Notes </div> ;
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {isMobile && (<div className="toggle-btn ">
          <button className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleNavbar}>
            <h1><i class="fa fa-bars" aria-hidden="true"></i></h1>
          </button>
          <button className="add-btn fa fa-plus" onClick={onAddNote}></button> 
        </div>)}
        <input
          type="text"
          className="main-edit-input"
          id="title"
          value={activeNote.title}
          onChange={(e) =>
            onEditField(
              "title",
              e.target.value,
              activeNote.fontSize,
              activeNote.textCase
            )
          }
          autoFocus
        />
        <div className="app-main-header">
          {/*  toolbar --------------------------------------- */}
          <input
            className="fontsize"
            type="number"
            onChange={(e) => handleFontSizeChange(e.target.value)}
            value={activeNote.fontSize}
          />

          {/* dropdown menu-------------------------------------- */}
          <Dropdown as={ButtonGroup} id="drop-dwn">
          <Dropdown.Toggle split variant="" value="fxb" className="btn-drop" id="btn-drop">{textCase}</Dropdown.Toggle>
            <Dropdown.Menu id="menu-drop">
              <Dropdown.Item
                id="menu-item" value="none" text="none"
                onClick={() => handleTextCaseChange("none")}
              >
                None
              </Dropdown.Item>
              <Dropdown.Item
                id="menu-item" value="upper"
                onClick={() => handleTextCaseChange("uppercase")}
              >
                Upper
              </Dropdown.Item>
              <Dropdown.Item
                id="menu-item" value="lower"
                onClick={() => handleTextCaseChange("lowercase")}
              >
                Lower
              </Dropdown.Item>
              <Dropdown.Item
                id="menu-item" value="capitalize"
                onClick={() => handleTextCaseChange("capitalize")}
              >
                Capital
              </Dropdown.Item>
              <Dropdown.Item
                id="menu-item" value="title"
                onClick={() => handleTextCaseChange("titlecase")}
              >
                Title
              </Dropdown.Item>
            </Dropdown.Menu>
          
          </Dropdown>
          <button className="btn-copy btn-white" onClick={handleCopy}>
            {copyStatus}
          </button>
        </div>

        <textarea
          id="body"
          ref={content}
          placeholder="write your note here......"
          style={{
            fontSize: `${activeNote.fontSize}px`,
            textTransform: `${activeNote.textCase}`,
          }}

          value={
            activeNote.textCase === "titlecase" ||
            activeNote.textCase === "sentencecase"
              ? toTitleCase(activeNote.body)
              : activeNote.body
          }

          onChange={(e) =>
            onEditField(
              "body",
              e.target.value,
              activeNote.fontSize,
              activeNote.textCase
            )
          }

          
        />

        <div className="textarea-footer">
          <i className="words">
            words : {activeNote.body.trim().split(/\s+/).length}
          </i>
          <i className="chars">characters : {activeNote.body.length}</i>
        </div>
      </div>
    </div>
  );
}

export default Main