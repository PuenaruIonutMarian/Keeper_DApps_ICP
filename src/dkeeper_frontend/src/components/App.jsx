import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

function App() {
  // State to hold the notes
  const [notes, setNotes] = useState([]);

  // Function to add a new note
  function addNote(newNote) {
    // Call the backend to create a new note
    dkeeper_backend.createNote(newNote.title, newNote.content);

    // Update the state with the new note
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  // Fetch data (notes) from the backend on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch notes from the backend
  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(notesArray);
  }

  // Function to delete a note
  function deleteNote(id) {
    // Call the backend to remove the note
    dkeeper_backend.removeNote(id);

    // Update the state by filtering out the deleted note
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      {/* Header */}
      <Header />

      {/* CreateArea component to add new notes */}
      <CreateArea onAdd={addNote} />

      {/* Mapping through notes and rendering Note components */}
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

