import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();

    if (newNote.trim() === "") { // Validación de texto vacío o solo espacios
      alert("No se puede agregar una nota vacía.");
      return;
    }

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
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
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
