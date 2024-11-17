//src\components\Note.jsx
import PropTypes from 'prop-types';

const Note = ({ note }) => {
    return (
        <li>
            <span>{note.id} - </span>
            {note.content} : {String(note.important)}
        </li>
    )
}

Note.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        important: PropTypes.bool.isRequired,
    }).isRequired,
};


export default Note