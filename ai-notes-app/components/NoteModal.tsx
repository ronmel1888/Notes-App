"use client";

import { FC } from "react";

interface NoteModalProps {
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const NoteModal: FC<NoteModalProps> = ({ title, message, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg">
        {title && <h2 className="text-xl text-black font-bold mb-2">{title}</h2>}
        {message && <p className="mb-4 text-black">{message}</p>}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg text-black border border-black-300 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
