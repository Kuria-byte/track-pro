import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Plus, Trash2 } from 'lucide-react';

const NotesSection: React.FC = () => {
  const { userData, addNote, removeNote } = useUser();
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteType, setNewNoteType] = useState('Priority');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteContent.trim()) {
      addNote({
        type: newNoteType,
        content: newNoteContent.trim(),
        date: new Date().toISOString().split('T')[0]
      });
      setNewNoteContent('');
    }
  };

  const noteTypes = ['Priority', 'Feedback', 'Question', 'Idea'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Notes</h2>

      <div className="space-y-3 mb-6">
        {userData.notes.length > 0 ? (
          userData.notes.map(note => (
            <div
              key={note.id}
              className="p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 mr-2">
                      {note.type}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{note.date}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-800 dark:text-white">{note.content}</p>
                </div>
                <button
                  onClick={() => removeNote(note.id)}
                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No notes added yet</p>
        )}
      </div>

      <form onSubmit={handleAddNote} className="mt-4">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <select
              value={newNoteType}
              onChange={(e) => setNewNoteType(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 text-sm py-2 px-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {noteTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Add a note..."
              className="flex-grow rounded-md border-gray-300 dark:border-gray-600 text-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-150 flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            <span>Add Note</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotesSection;