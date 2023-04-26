import React, { useState, useEffect } from "react";
import Note from "./components/Note";

import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
    .create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote("");
    });
  };

    // controlador de eventos sincroniza cambios de entrada
    const handleNoteChange = (event) => {
      setNewNote(event.target.value);
    };

   //variable notesToShow que almacena una lista de todas las notas que se deben mostrar
   const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote).then(returnendNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnendNote))
    })
    .catch(_error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>App Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance = {() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={handleNoteChange} // atributo onChange con registro de evento en su input
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
