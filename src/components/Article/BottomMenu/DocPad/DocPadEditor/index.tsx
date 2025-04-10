'use client'

import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import Toolbar from './Toolbar'
import { v4 as uuidv4 } from 'uuid'
import TitleInput from './TitleInput'
import clsx from 'clsx'
import DocPadMenuButton from './DocPadMenuButton'

type Note = {
  id: string
  title: string
  content: string
}

const DocPadEditor: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    const storedNotes = localStorage.getItem('docpad_notes')
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: 'Start typing here...',
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Highlight.configure({ multicolor: true }),
      TextStyle.configure(),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'right', 'center'],
        defaultAlignment: 'left',
      }),
      CharacterCount.configure({
        textCounter: (text) => [...new Intl.Segmenter().segment(text)].length,
        wordCounter: (text) => text.split(/\s+/).filter((word) => word !== '').length,
      }),
    ],
    content: '<p></p>',
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  })

  // Save the current note to localStorage
  const saveNote = () => {
    if (!editor) return
    const plainText = editor.getText().trim()
    if (!plainText) return alert('A note must have content.')
    if (!title.trim()) return alert('Please enter a title.')

    const newNote = {
      id: uuidv4(),
      title,
      content: editor.getHTML(),
    }
    const updatedNotes = currentId
      ? notes.map((note) =>
          note.id === currentId ? { ...note, title, content: newNote.content } : note,
        )
      : [...notes, newNote]

    setNotes(updatedNotes)
    localStorage.setItem('docpad_notes', JSON.stringify(updatedNotes))
    clearNotePad()
  }

  // Load a note into the editor
  const loadNote = (note: Note) => {
    setCurrentId(note.id)
    setTitle(note.title)
    if (editor) {
      editor.commands.setContent(note.content)
    }
  }

  // Clear the editor and note details
  const clearNotePad = () => {
    setCurrentId(null)
    setTitle('')
    if (editor) {
      editor.commands.clearContent()
    }
  }

  // Delete a note from localStorage
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
    localStorage.setItem('docpad_notes', JSON.stringify(updatedNotes))
    if (currentId === id) {
      clearNotePad()
    }
  }

  return (
    <div className="flex h-[355px] w-full justify-between">
      {/* Editor Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor */}
      <div className="relative flex flex-1 flex-col bg-white">
        <TitleInput
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditorContent
          className={clsx(
            'flex-1 overflow-y-auto border-l-[2px] border-l-black bg-white p-2',
            'prose max-w-none prose-headings:my-1 prose-p:my-0',
          )}
          editor={editor}
        />

        {/* Word and character count */}
        <div className="absolute right-2 top-2 grid w-40 grid-cols-2 gap-x-2 pr-4 text-sm text-muted-foreground">
          <div className="ml-auto text-secondary-blue">
            {editor ? editor?.storage.characterCount.words() : 'null'}
          </div>
          <div>Words</div>
          <div className="ml-auto text-secondary-blue">
            {editor ? editor?.storage.characterCount.characters() : 'null'}
          </div>
          <div>Characters</div>
        </div>
      </div>

      {/* Note management interface | CRUD to local storage */}
      <div className="flex h-full w-32 flex-col gap-2 text-white">
        <DocPadMenuButton onClick={saveNote}>
          {currentId ? 'Update Note' : 'Save Note'}
        </DocPadMenuButton>
        <DocPadMenuButton onClick={clearNotePad}>New Note</DocPadMenuButton>

        <div className="flex min-h-0 flex-1 flex-col gap-2 pl-2 pt-2">
          <h3 className="font-bold">Saved Notes</h3>
          <ul className="space-y-2 overflow-y-auto text-sm">
            {notes.map((note) => (
              <li
                key={note.id}
                className="flex items-center justify-between rounded bg-black px-2 py-1"
              >
                <button
                  onClick={() => loadNote(note)}
                  className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left hover:text-secondary-blue"
                >
                  {note.title}
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="ml-2 text-red-200 hover:text-red-400"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DocPadEditor
