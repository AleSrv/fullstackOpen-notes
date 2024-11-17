import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
  }, [])

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, // 50% de probabilidad de que sea true o false
      id: notes.length + 1, // Generar id secuencial
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      {notesToShow.map((note) => (
        <div key={note.id}>
          <p>
            <span>{note.id} - </span>
            {note.content} : {String(note.important)}
          </p>
        </div>
      ))}
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Important" : "Show All"}
      </button>
      <form onSubmit={addNote}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

App.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      important: PropTypes.bool.isRequired,
    })
  ),
};

export default App;
