import React from "react";

const Test = () => {
  return (
    <div>
      Add Note Card
      <div className="flex flex-col justify-between bg-white p-4 rounded-lg shadow border border-gray-200">
        <textarea
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Add a new note..."
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none mb-2"
          rows={4}
        />
        <button
          onClick={handleAddNote}
          className="p-2 bg-customBlue-1 text-white rounded-md hover:bg-customBlue-2 transition-all flex justify-center items-center"
        >
          <FaPlus className="mr-2" /> Add Note
        </button>
      </div>
      {/* Existing Notes */}
      {notes.map((note) => (
        <div
          key={note.id}
          className="flex flex-col justify-between bg-white p-4 rounded-lg shadow border border-gray-200"
        >
          {note.isEditing ? (
            <textarea
              value={note.text}
              onChange={(e) => handleSaveNote(note.id, e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none mb-2"
              rows={4}
            />
          ) : (
            <span className="flex-grow p-2">{note.text}</span>
          )}
          <div className="flex justify-end items-center gap-2 mt-2">
            <button
              onClick={() => handleEditNote(note.id)}
              className="p-2 text-gray-600 hover:text-black transition-all"
            >
              {note.isEditing ? <FaSave /> : <FaEdit />}
            </button>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="p-2 text-gray-600 hover:text-black transition-all"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Test;
