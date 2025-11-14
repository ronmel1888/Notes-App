"use client";

import { useEffect, useState } from "react";
import { Note, GPTAction } from "@/types";
import ActionModal from "@/components/ActionModal";
import NoteModal from "@/components/NoteModal";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data: Note[] = await res.json();
    setNotes(data);
  }

  async function saveNote() {
    if (!text.trim()) return;
    await fetch("/api/notes", { method: "POST", body: JSON.stringify({ text }) });
    setText("");
    loadNotes();
  }

  async function analyze(noteId: string, action: GPTAction) {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ noteId, action }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      loadNotes();
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">🌟 AI Notes</h1>

      {/* Input */}
      <div className="mb-6">
        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your note here..."
        />
        <button
          onClick={saveNote}
          className="mt-3 bg-blue-500 text-white py-2 px-6 rounded-xl shadow hover:bg-blue-600 transition"
        >
          Save Note
        </button>
      </div>

      {/* Notes */}
      <h2 className="text-2xl font-semibold mb-4 text-black">Your Notes</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <p className="mb-3 text-gray-800 hover:font-bold transition">{note.text}</p>
              <span className="text-gray-400 text-xs">
                {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
                onClick={() => setSelectedNote(note)}
              >
                Analyze
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded-lg text-sm hover:bg-red-600 transition"
                onClick={() => setNoteToDelete(note)}
              >
                Delete
              </button>
            </div>

            {/* Cached GPT results */}
            {note.analysis?.improve && (
              <p className="mt-3 p-3 bg-green-50 border-l-4 border-green-400 text-green-800 rounded hover:font-bold transition">
                <strong>Improved:</strong> {note.analysis.improve}
              </p>
            )}
            {note.analysis?.summarize && (
              <p className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded hover:font-bold transition">
                <strong>Summary:</strong> {note.analysis.summarize}
              </p>
            )}
            {note.analysis?.translate && (
              <p className="mt-3 p-3 bg-purple-50 border-l-4 border-purple-400 text-purple-800 rounded hover:font-bold transition">
                <strong>Translation:</strong> {note.analysis.translate}
              </p>
            )}

            {error && (
              <p className="mt-2 text-red-600 font-semibold">{error}</p>
            )}
          </div>
        ))}
      </div>

      {/* Analyze Modal */}
      {selectedNote && (
        <ActionModal
          noteId={selectedNote._id}
          onClose={() => setSelectedNote(null)}
          onSelect={(action: GPTAction) => {
            analyze(selectedNote._id, action);
            setSelectedNote(null);
          }}
        />
      )}

      {/* Delete Modal */}
      {noteToDelete && (
        <NoteModal
          title="Delete Note?"
          message="Are you sure you want to delete this note? This cannot be undone."
          onClose={() => setNoteToDelete(null)}
          onConfirm={async () => {
            if (!noteToDelete) return;
            try {
              const res = await fetch(`/api/notes?id=${noteToDelete._id}`, { method: "DELETE" });
              if (!res.ok) {
                const data = await res.json();
                alert(data.error || "Failed to delete note");
              }
            } catch (err) {
              console.error(err);
              alert("Error deleting note");
            } finally {
              setNoteToDelete(null);
              loadNotes();
            }
          }}
        />
      )}

      {loading && (
        <p className="mt-4 text-center text-gray-600 animate-pulse">
          Processing GPT request...
        </p>
      )}
    </div>
  );
}
