import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";

// Define an actor named DKeeper
actor DKeeper {

  // Define the structure for a Note
  public type Note = {
    title : Text;
    content : Text;
  };

  // Initialize notes as an empty list of Note
  stable var notes : List.List<Note> = List.nil<Note>();

  // Create a new Note and add it to the notes list
  public func createNote(titleText : Text, contentText : Text) {
    // Create a new Note using the provided title and content
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };
    // Push the new Note onto the notes list
    notes := List.push(newNote, notes);
    // Print the updated notes list for debugging purposes
    Debug.print(debug_show (notes));
  };

  // Retrieve all notes as an array
  public query func readNotes() : async [Note] {
    // Convert the notes list to an array and return it
    return List.toArray(notes);
  };

  // Remove a note by its index
  public func removeNote(id : Nat) {
    // Take the front part of the notes list up to the specified index
    let listFront = List.take(notes, id);
    // Drop the note at the specified index and take the rest
    let listBack = List.drop(notes, id + 1);
    // Concatenate the front and back parts to remove the note
    notes := List.append(listFront, listBack);
  };
};
