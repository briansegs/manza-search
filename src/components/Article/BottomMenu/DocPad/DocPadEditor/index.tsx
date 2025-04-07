'use client'

import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './quill-overrides.css'
import Toolbar from './Toolbar'

const DocPadEditor: React.FC = () => {
  const [content, setContent] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)

  // console.log('content: ', content)

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
    }
  }, [])

  return (
    <div className="flex w-full justify-between">
      <Toolbar />

      <div className="flex-1 bg-white">
        <div id="editor" ref={editorRef} />
      </div>

      <div className="w-32 bg-menu-red">{/* Add save, delete, edit, and view notes buttons */}</div>
    </div>
  )
}

export default DocPadEditor
