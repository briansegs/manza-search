'use client'

import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './quill-overrides.css'
import Toolbar from './Toolbar'
import { v4 as uuidv4 } from 'uuid'
import TitleInput from './TitleInput'

const DocPadMenuButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => (
  <button
    {...props}
    className="rounded border-[1px] border-white bg-menu px-2 py-1 text-sm hover:border-black hover:bg-black hover:text-muted"
  />
)

type Note = {
  id: string
  title: string
  content: string
}

const DocPadEditor: React.FC = () => {
  const [content, setContent] = useState('')
  const [notes, setNotes] = useState<Note[]>([])
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)

  // console.log('content: ', content)

  useEffect(() => {
    const storedNotes = localStorage.getItem('docpad_notes')
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        modules: {
          toolbar: {
            container: '#custom-toolbar',
          },
        },
        placeholder: 'Start typing here...',
        theme: 'snow',
      })

      // Setup editor
      quill.setText('')
      quill.formatText(0, quill.getLength(), {
        bold: false,
        italic: false,
        underline: false,
        strike: false,
        script: false,
      })
      quill.setSelection(0)

      quill.on('text-change', () => {
        setContent(quill.root.innerHTML)
      })

      quillRef.current = quill
    }
  }, [])

  const saveNote = () => {
    const plainText = content.replace(/<[^>]*>/g, '').replace(/&nbsp;|\s/g, '')

    if (!plainText) {
      return alert('A note must have content.')
    }

    if (!title.trim()) return alert('Please enter a title.')

    const updatedNotes = currentId
      ? notes.map((note) => (note.id === currentId ? { ...note, title, content } : note))
      : [...notes, { id: uuidv4(), title, content }]

    setNotes(updatedNotes)
    localStorage.setItem('docpad_notes', JSON.stringify(updatedNotes))
    clearNotePad()
  }

  const loadNote = (note: Note) => {
    setCurrentId(note.id)
    setTitle(note.title)
    quillRef.current?.clipboard.dangerouslyPasteHTML(note.content)
    setContent(note.content)
  }

  const clearNotePad = () => {
    setCurrentId(null)
    setTitle('')
    quillRef.current?.setText('')
  }

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
    localStorage.setItem('docpad_notes', JSON.stringify(updatedNotes))
    if (currentId === id) {
      clearNotePad()
    }
  }

  return (
    <div className="flex h-[324px] w-full justify-between">
      <Toolbar />

      <div className="flex flex-1 flex-col bg-white">
        <TitleInput
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="editor" ref={editorRef} />
      </div>

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
