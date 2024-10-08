import React, { createRef, useEffect, useRef, useState } from 'react';
import Note from './note.';

const Notes = ({notes=[] , setNotes = () => {}}) => {

    useEffect(() => {
        // localstorage logic
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = notes.map((note) => {
            const saveNote = savedNotes.find((n) => n.id === note.id);
            if(saveNote){
                return {...note,position:saveNote.position};
            }else{
                const position = determineNewPosition();
                return {...note,position};
            }
        });

        setNotes(updatedNotes);
        localStorage.setItem("notes" , JSON.stringify(updatedNotes));
    },[notes.length]);

    const noteRefs = useRef([]);

    const determineNewPosition = () => {
        const maxX = window.innerWidth - 250;
        const maxY = window.innerHeight - 250;

        return {
            x : Math.floor(Math.random() * maxX),
            y : Math.floor(Math.random() * maxY)
        }
    }

    const handleDragStart = (note,e) => {
        const {id} = note;
        const noteRef   = noteRefs.current[id].current;
        const rect =  noteRef.getBoundingClientRect();
        console.log(rect);
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const startPos = note.position;

        const handleMouseUp = () => {
        document.removeEventListener("mousemove" ,handleMouseMove);
        document.removeEventListener("mouseup" , handleMouseUp);
        
        const finalRect  = noteRef.getBoundingClientRect();
        const newPosition = {x : finalRect.left , y : finalRect.top};

        if(checkForOverlap(id)){
            noteRef.style.left = `${startPos.x}px`;
            noteRef.style.top = `${startPos.y}px`;
        } else {
            updateNotePosition(id , newPosition);
        }

        };

        const updateNotePosition = (id , pos) => {
            const updatedNotes = notes.map(note => note.id === id ? {...note,position : pos} : note );
            setNotes(updatedNotes);
            localStorage.setItem("notes" , JSON.stringify(updatedNotes));
        }

        const checkForOverlap = (id) => {
            const currentNoteRef = noteRefs.current[id].current;
            const currentRect =  noteRef.getBoundingClientRect();

            return notes.some((note)=>{
                if(note.id === id) return false;
                const otherNoteRef = noteRefs.current[note.id].current;
                const otherRect = otherNoteRef.getBoundingClientRect();

                const overlap = !(
                        currentRect.right < otherRect.left ||
                        currentRect.left  > otherRect.right ||
                        currentRect.top > otherRect.bottom ||
                        currentRect.bottom  < otherRect.top
                );

                return overlap;
            })
        }

        const handleMouseMove = (e) => { 
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            noteRef.style.left = `${newX}px`;
            noteRef.style.top = `${newY}px`;
        };

        document.addEventListener("mousemove" ,handleMouseMove);
        document.addEventListener("mouseup" , handleMouseUp);
    }

    return (
            <>
            {notes.map((note) =>{
                return <Note key = {note.id} 
                        ref = {
                        noteRefs.current[note.id]
                        ? noteRefs.current[note.id]
                        : (noteRefs.current[note.id] = createRef())
                        }
                        initialPos = {note.position} content ={note.text}
                        onMouseDown = {(e) => handleDragStart(note,e)}
                        ></Note>
            })}
            </>
    );
};

export default Notes;