
import NoteCard from "./NoteCard";

function NotesList({ notes }) {
    if (!notes.length) {
        return <p>No notes available</p>;
    }

    return (
        <>
            {notes
                .filter(note => note.status === "approved")
                .map(note => (
                    <NoteCard key={note._id} note={note} />
                ))}
        </>
    );
}

export default NotesList;