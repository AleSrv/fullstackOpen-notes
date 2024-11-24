//src\components\Note.jsx

import PropTypes from 'prop-types';

const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'make not important' : 'make important';

    return (
        <li>
            {note.id} - {note.content} {" "}
            <button onClick={toggleImportance}>{label}</button> {" "}
            <span style={{ color: note.important ? 'green' : 'red' }}>
                {note.important ? '✔️ Important' : '❌ Not important'}
            </span>

        </li>
    );
};


Note.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        important: PropTypes.bool.isRequired,
    }).isRequired,
    toggleImportance: PropTypes.func.isRequired,
};


export default Note