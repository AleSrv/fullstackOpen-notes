//src\App.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Note from "./components/Note";
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    if (newNote.trim() === "") {
      alert("No se puede agregar una nota vacía.");
      return;
    }
    //CREAMOS NUEVO OBJETO
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length > 0
        ? (Math.max(...notes.map(note => Number(note.id))) + 1).toString()
        : "1" // Mantener id como string
    };

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Important" : "Show All"}
      </button>
      <form onSubmit={addNote}>
        <input type="text" onChange={(e) => setNewNote(e.target.value)} value={newNote} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

App.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      important: PropTypes.bool.isRequired,
    })
  ),
};

export default App;
