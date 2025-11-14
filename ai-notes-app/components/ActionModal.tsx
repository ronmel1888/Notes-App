"use client";
import { GPTAction } from "@/types";

interface Props {
  noteId: string;
  onClose: () => void;
  onSelect: (action: GPTAction) => void;
}

export default function ActionModal({ onClose, onSelect }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80">
        <h2 className="text-lg font-bold mb-4 text-black">Choose Action</h2>
        <div className="flex flex-col gap-3">
          <button
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 hover:font-bold"
            onClick={() => onSelect("improve")}
          >
            Improve
          </button>
          <button
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600 hover:font-bold"
            onClick={() => onSelect("summarize")}
          >
            Summarize
          </button>
          <button
            className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 hover:font-bold"
            onClick={() => onSelect("translate")}
          >
            Translate
          </button>
          <button
            className="bg-gray-300 py-2 text-black rounded hover:bg-gray-400 mt-2 hover:font-bold transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
