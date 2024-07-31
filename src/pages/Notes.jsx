import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      heading: "Sample Note 1",
      text: "This is a sample note.",
      tags: ["sample", "note"],
    },
    {
      id: 2,
      heading: "Sample Note 2",
      text: "This is another sample note.",
      tags: ["example"],
    },
    {
      id: 3,
      heading: "Sample Note 3",
      text: "Yet another sample note.",
      tags: ["example", "note"],
    },
    {
      id: 4,
      heading: "Sample Note 4",
      text: "More sample notes here.",
      tags: ["more", "sample"],
    },
  ]);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteHeading, setNewNoteHeading] = useState("");
  const [newNoteTags, setNewNoteTags] = useState("");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const debounceTimeoutRef = useRef(null);

  const handleAddNote = () => {
    if (newNoteText.trim() && newNoteHeading.trim()) {
      const newNote = {
        id: Date.now(),
        heading: newNoteHeading,
        text: newNoteText,
        tags: newNoteTags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };
      setNotes([...notes, newNote]);
      setNewNoteText("");
      setNewNoteHeading("");
      setNewNoteTags("");
    }
  };

  const handleEditNote = (id, newHeading, newText, newTags) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, heading: newHeading, text: newText, tags: newTags }
          : note
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
      note.text.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(debouncedSearchText.toLowerCase())
      )
  );

  return (
    <div className="p-2">
      <div className="mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search notes..."
          className="w-full p-3 bg-white rounded-lg shadow border border-gray-300 outline-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex flex-col justify-between bg-white p-4 rounded-lg shadow border border-gray-300">
          <input
            type="text"
            value={newNoteHeading}
            onChange={(e) => setNewNoteHeading(e.target.value)}
            placeholder="Note heading..."
            className="mb-2 p-2 bg-gray-100 text-sm font-medium text-gray-700 outline-none rounded-md"
          />
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Add a new note..."
            className="flex-grow overflow-auto text-justify bg-gray-100 p-2 text-sm font-light text-gray-700 outline-none rounded-md"
            rows={4}
          />
          <input
            type="text"
            value={newNoteTags}
            onChange={(e) => setNewNoteTags(e.target.value)}
            placeholder="Tags (comma-separated)"
            className="mt-2 p-2 bg-gray-100 text-[12px] font-medium text-gray-700 outline-none rounded-md"
          />
          <button
            onClick={handleAddNote}
            className="mt-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-normal transition-all flex justify-center items-center"
          >
            <FaPlus className="mr-2" /> Add Note
          </button>
        </div>
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow border border-gray-300 h-60 overflow-auto"
          >
            <input
              type="text"
              value={note.heading}
              onChange={(e) =>
                handleEditNote(note.id, e.target.value, note.text, note.tags)
              }
              className="mb-2 p-2 text-sm font-medium text-gray-700 outline-none rounded-md"
            />
            <textarea
              value={note.text}
              onChange={(e) =>
                handleEditNote(note.id, note.heading, e.target.value, note.tags)
              }
              className="flex-grow overflow-auto text-justify bg-gray-100 p-2 text-sm font-light text-gray-500 outline-none rounded-md"
              rows={4}
            />

            <div className="flex justify-between items-center gap-2 mt-2">
              <div className="flex flex-wrap items-center gap-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-all"
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
