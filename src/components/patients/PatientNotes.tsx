import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface Note {
  id: string;
  date: string;
  content: string;
  provider: string;
}

interface PatientNotesProps {
  notes: Note[];
  onAddNote: (content: string) => void;
}

export function PatientNotes({ notes, onAddNote }: PatientNotesProps) {
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
      setShowAddNote(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Notes</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowAddNote(true)}
          icon={<Plus className="h-4 w-4" />}
        >
          Add Note
        </Button>
      </div>

      {showAddNote && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Enter note..."
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowAddNote(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Note
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{note.provider}</span>
              <span className="text-sm text-gray-500">{note.date}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}