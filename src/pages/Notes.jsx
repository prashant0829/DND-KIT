import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, heading: "Sample Note 1", text: "This is a sample note." },
    { id: 2, heading: "Sample Note 2", text: "This is another sample note." },
    { id: 3, heading: "Sample Note 3", text: "Yet another sample note." },
    { id: 4, heading: "Sample Note 4", text: "More sample notes here." },
  ]);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteHeading, setNewNoteHeading] = useState("");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const debounceTimeoutRef = useRef(null);

  const handleAddNote = () => {
    if (newNoteText.trim() && newNoteHeading.trim()) {
      const newNote = {
        id: Date.now(),
        heading: newNoteHeading,
        text: newNoteText,
      };
      setNotes([...notes, newNote]);
      setNewNoteText("");
      setNewNoteHeading("");
    }
  };

  const handleEditNote = (id, newHeading, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, heading: newHeading, text: newText } : note
      )
    );
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300); // 300ms debounce delay

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchText]);

  const filteredNotes = notes.filter(
    (note) =>
      note.heading.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
      note.text.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  return (
    <div className="p-2">
      <div className="mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search notes..."
          className="w-full p-2 bg-white rounded-lg shadow border border-gray-200 outline-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex flex-col justify-between bg-white p-2 rounded-lg shadow border border-gray-200">
          <input
            type="text"
            value={newNoteHeading}
            onChange={(e) => setNewNoteHeading(e.target.value)}
            placeholder="Note heading..."
            className="mb-2 p-1 bg-slate-100 text-[13px] font-light text-gray-500 outline-none rounded-md"
          />
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Add a new note..."
            className="flex-grow overflow-auto text-justify bg-slate-100 p-1 text-[13px] font-light text-gray-500 outline-none rounded-md"
            rows={4}
          />
          <button
            onClick={handleAddNote}
            className="mt-1 p-2 bg-yellow-1 text-dark rounded-md hover:bg-yellow-2 hover:text-dark font-normal transition-all flex justify-center items-center"
          >
            <FaPlus className="mr-2" /> Add Note
          </button>
        </div>
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col justify-between p-2 bg-white rounded-lg shadow border border-gray-200 h-52 overflow-auto"
          >
            <input
              type="text"
              value={note.heading}
              onChange={(e) =>
                handleEditNote(note.id, e.target.value, note.text)
              }
              className="mb-2 p-1 text-[13px] font-normal text-gray-500 outline-none rounded-md"
            />
            <textarea
              value={note.text}
              onChange={(e) =>
                handleEditNote(note.id, note.heading, e.target.value)
              }
              className="flex-grow overflow-auto text-justify bg-slate-100 p-1 text-[13px] font-light text-gray-500 outline-none rounded-md"
              rows={4}
            />
            <div className="flex justify-end items-center gap-2 mt-2">
              <button
                onClick={() => {}}
                className="p-2 mt-1 text-gray-600 hover:text-black transition-all"
              >
                <FaEye />
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
    </div>
  );
};

export default Notes;
