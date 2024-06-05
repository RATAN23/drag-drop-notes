import { useState } from 'react'
import './App.css'
import Notes from './components/notes';

function App() {
  const [notes, setNotes] = useState([
    {
      id : 1,
      text : "This is my first sticky note"
    },{
      id : 2,
      text : "This belongs to Ratan, please leave it."
    }
  ]);

  const [noteData, setNoteData]= useState("");

 
  
  const addNote = () => {
    if (noteData.trim() !== '') {
      const newNote = {
        id: notes.length + 1, // Simple ID generation. Consider using a more robust method in a real app.
        text: noteData
      };
      setNotes([...notes, newNote]);
      setNoteData(''); // Clear the input field
    }
  };

  const deleteNote = () => {
      if(noteData.trim() !== ''){
        const updatedNotes = notes.filter(note=> note.text !== noteData );
        setNotes(updatedNotes);
        setNoteData('');
      }
  };

  return (
    <>
      <div style={{display : 'flex' , alignItems: 'center' , flexDirection : 'column', width:'100%' }}>
        <h1>Todo list</h1>
        <input type='text' value = {noteData} onChange={(e) => setNoteData(e.target.value)} style = {{width: '20%', height: '40px' , fontSize : '20px'}} placeholder='Add your task'></input>
      </div>
      <div style = {{display : 'flex' , justifyContent: 'center', alignItems: 'center', width: '100%' , gap : '20px'}}>
      <button type = "submit"onClick={addNote} style={{marginTop: '10px',width: '3%', height: '35px' }}>Add</button>  
      <button type = "submit" onClick={deleteNote} style={{marginTop: '10px',width: '3%', height: '35px' }}>Delete</button>  
      </div>
      <Notes notes = {notes} setNotes = {setNotes}/>
    </>
  )
}

export default App
