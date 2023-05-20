import React from 'react'
import { useState, useEffect } from "react";
import "./MainPage.css";
import uuid from "react-uuid";
import styles from "./Footer.css";
import { FiCopy } from "react-icons/fi";
import { FaInstagram, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa";
import Sidebar from "../components/Sidebar/Sidebar";
import BuildNShip from "../assets/BuildNShip.png";
import Main from "../components/Main/Main";
import SidePanel from "../components/SidePanel/SidePanel";


const MainPage = () => {
    const [notes, setNotes] = useState(
        localStorage.notes ? JSON.parse(localStorage.notes) : []
    );

    const [activeNote, setActiveNote] = useState(false);
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const [isOpen, setIsOpen] = useState(true);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };

    const onAddNote = () => {
        const newNote = {
            id: uuid(),
            title: "Untitled note",
            body: "Write your note here",
            lastModified: Date.now(),
            fontSize: 14,
            textCase: ''
        };

        setNotes([newNote, ...notes]);
        setActiveNote(newNote.id);
        
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

    const isMobile = window.innerWidth <= 900;



    return (
        <div className="App">
            {!isMobile && <Sidebar
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
            />}
            {isMobile && <SidePanel
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                toggleNavbar={toggleNavbar}
                isOpen={isOpen}
                

            />}
            <Main activeNote={getActiveNote()}
             onUpdateNotes={onUpdateNotes} 
             onAddNote={onAddNote}
             toggleNavbar={toggleNavbar}
             isOpen={isOpen} 
             setIsOpen={setIsOpen}/>

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

export default MainPage