import React from 'react'
import { Note } from '.'
import DocPadMenuButton from './DocPadMenuButton'

interface NoteCRUDManagerProps {
  saveNote: () => void
  currentId: string | null
  clearNotePad: () => void
  notes: Note[]
  loadNote: (note: Note) => void
  deleteNote: (id: string) => void
}

const NoteCRUDManager: React.FC<NoteCRUDManagerProps> = ({
  saveNote,
  currentId,
  clearNotePad,
  notes,
  loadNote,
  deleteNote,
}) => (
  <div className="flex h-full w-32 flex-col gap-2 text-white">
    <DocPadMenuButton onClick={saveNote} aria-label="Save or update note">
      {currentId ? 'Update' : 'Save'}
    </DocPadMenuButton>
    <DocPadMenuButton onClick={clearNotePad} aria-label="Clear editor">
      New
    </DocPadMenuButton>

    <div className="flex min-h-0 flex-1 flex-col gap-2 pl-0 pt-2 md:pl-2">
      <h3 className="mx-auto font-bold">Saved Notes</h3>
      <ul className="max-h-56 space-y-2 overflow-y-auto text-sm md:max-h-none">
        {notes.length === 0 ? (
          <li className="text-center text-gray-400">No Notes</li>
        ) : (
          notes.map((note) => (
            <li
              key={note.id}
              className="flex items-center justify-between rounded bg-black px-2 py-1"
            >
              <button
                onClick={() => loadNote(note)}
                className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left hover:text-secondary-blue"
                aria-label="Load note"
              >
                {note.title}
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="ml-2 text-red-200 hover:text-red-400"
                aria-label="Delete note"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  </div>
)

export default NoteCRUDManager
