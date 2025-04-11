import clsx from 'clsx'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CodeXml,
  CornerDownLeft,
  Eraser,
  Italic,
  List,
  ListOrdered,
  ListX,
  Pilcrow,
  Quote,
  Redo,
  RemoveFormatting,
  SeparatorHorizontal,
  Strikethrough,
  Type,
  Undo,
} from 'lucide-react'
import React from 'react'
import ToolbarButton from './ToolbarButton'
import { Editor } from '@tiptap/react'
import HeadingSelect from './HeadingSelect'
import HighlighterSelect from './HighlighterSelect'
import ColorSelect from './ColorSelect'

type ToolbarProps = {
  editor: Editor | null
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null

  const iconStyles = (tagOrObj?: string | object, obj?: object) => {
    const isActive =
      typeof tagOrObj === 'string'
        ? editor.isActive(tagOrObj, obj)
        : editor.isActive(tagOrObj as object)

    return clsx(
      tagOrObj ? (isActive ? 'text-secondary-blue' : 'text-white') : 'text-white',
      'size-5 hover:text-secondary-blue',
    )
  }

  return (
    <div
      id="custom-toolbar"
      className={clsx('grid h-fit w-32 grid-cols-6', 'rounded-l-sm border-2 border-black')}
      onFocusCapture={(e) => {
        e.stopPropagation()
      }}
      role="toolbar"
      aria-label="Text formatting options"
    >
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        description="Undo"
        colSpan="3"
      >
        {/* Undo */}
        <Undo className={iconStyles()} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        description="Redo"
        colSpan="3"
      >
        {/* Redo */}
        <Redo className={iconStyles()} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        description="Clear text formatting"
      >
        {/* Clear Text Formatting */}
        <Eraser className={iconStyles()} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().clearNodes().run()}
        description="Clear block formatting"
      >
        {/* Clear Block Formatting */}
        <ListX className={iconStyles()} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        description="Clear all formatting"
      >
        {/* Clear All Formatting*/}
        <RemoveFormatting className={iconStyles()} />
      </ToolbarButton>

      {/* Headings */}
      <HeadingSelect editor={editor} />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        description="Set Align left"
      >
        {/* Allign Left */}
        <AlignLeft className={iconStyles({ textAlign: 'left' })} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        description="Set Align center"
      >
        {/* Allign Center */}
        <AlignCenter className={iconStyles({ textAlign: 'center' })} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        description="Set Align right"
      >
        {/* Allign Right */}
        <AlignRight className={iconStyles({ textAlign: 'right' })} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        description="Toggle bold"
      >
        {/* Bold */}
        <Bold className={iconStyles('bold')} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        description="Toggle italic"
      >
        {/* Italic */}
        <Italic className={iconStyles('italic')} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        description="Toggle strike through"
      >
        {/* Strike Through */}
        <Strikethrough className={iconStyles('strike')} />
      </ToolbarButton>

      {/* Text color */}
      <ColorSelect editor={editor} iconStyles={iconStyles} />

      {/* Highlight text */}
      <HighlighterSelect editor={editor} iconStyles={iconStyles} />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        description="Toggle bullet list"
        colSpan="3"
      >
        {/* Bullet list */}
        <List className={iconStyles('bulletList')} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        description="Toggle ordered list"
        colSpan="3"
      >
        {/* Ordered list */}
        <ListOrdered className={iconStyles('orderedList')} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        description="Toggle code"
        colSpan="3"
      >
        {/* Code */}
        <Code className={iconStyles('code')} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        description="Toggle code block"
        colSpan="3"
      >
        {/* Code block */}
        <CodeXml className={iconStyles('codeBlock')} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        description="Add horizontal separator"
        colSpan="6"
      >
        {/* Horizontal rule */}
        <SeparatorHorizontal className={iconStyles()} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        description="Toggle block quote"
        colSpan="3"
      >
        {/* Blockquote */}
        <Quote className={iconStyles('blockquote')} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setHardBreak().run()}
        description="Insert line break"
        colSpan="3"
      >
        {/* Hard break */}
        <CornerDownLeft className={iconStyles()} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setFontFamily('serif').run()}
        description="Set serif"
        colSpan="3"
      >
        {/* Serif */}
        <Type className={iconStyles('textStyle', { fontFamily: 'serif' })} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        description="Convert to Paragraph"
        colSpan="3"
      >
        {/* Convert to Paragraph */}
        <Pilcrow className={iconStyles('paragraph')} />
      </ToolbarButton>
    </div>
  )
}

export default Toolbar
