import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React from 'react'
import ToolbarButton from './ToolbarButton'
import { Highlighter } from 'lucide-react'
import { Editor } from '@tiptap/react'

const HightlighterColors = [
  {
    label: 'red',
    color: '#fca5a5',
  },
  {
    label: 'green',
    color: '#22c55e',
  },
  {
    label: 'blue',
    color: '#93c5fd',
  },
  {
    label: 'yellow',
    color: '#fde047',
  },
]

type HighlighterSelectProps = {
  editor: Editor | null
  iconStyles: (tagOrObj?: string | object, obj?: object) => string
}

const HighlighterSelect: React.FC<HighlighterSelectProps> = ({ editor, iconStyles }) => {
  if (!editor) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton description="Select highlight color" colSpan="3">
          <Highlighter className={iconStyles('highlight')} />
        </ToolbarButton>
      </PopoverTrigger>

      <PopoverContent className="flex w-fit items-center gap-2 border-2 border-black bg-menu p-2">
        {HightlighterColors.map(({ color, label }) => (
          <button
            key={label}
            onClick={() => editor.chain().focus().toggleHighlight({ color: color }).run()}
            className="size-5 rounded-sm border-2 border-black"
            style={{ backgroundColor: color }}
          />
        ))}

        <button
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          className="rounded border-[1px] border-white bg-transparent p-1 text-sm text-white hover:border-black hover:bg-black"
        >
          Clear
        </button>
      </PopoverContent>
    </Popover>
  )
}

export default HighlighterSelect
