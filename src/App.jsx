//src\App.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Note from "./components/Note";

const App = () => {
  //notes = todas las notas
  const [notes, setNotes] = useState([]);
  //newNote = nueva nota
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      const notes = response.data.map((note) => ({
        ...note,
        id: Number(note.id), // Convertir id a número
      }));
      console.log("promise fulfilled");
      setNotes(notes);
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
      id: notes.length > 0
        ? Math.max(...notes.map(note => note.id)) + 1 // Encontrar el máximo id y sumar 1
        : 1 // Si la lista está vacía, asignar id 1
    };

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response.data);
        setNotes(notes.concat(response.data))
        // setNotes([...notes, response.data]); con Spread operator
        setNewNote('')
      })
  };

  //cambio input
  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  //CAMBIAR IMPORTANCIA MOTE
  const toggleImportanceOf = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, important: !note.important } : note
    ));
  };


  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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
