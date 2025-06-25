import { Popover, PopoverContent, PopoverTrigger } from '@/features/shared/components/ui/popover'
import React from 'react'
import ToolbarButton from './ToolbarButton'
import { Palette } from 'lucide-react'
import { Editor } from '@tiptap/react'

const colors = [
  {
    label: 'black',
    color: '#000000',
  },
  {
    label: 'white',
    color: '#ffffff',
  },
  {
    label: 'red',
    color: '#ef4444',
  },
  {
    label: 'green',
    color: '#22c55e',
  },
  {
    label: 'blue',
    color: '#3b82f6',
  },
  {
    label: 'yellow',
    color: '#eab308',
  },
]

type ColorSelectProps = {
  editor: Editor | null
  iconStyles: (tagOrObj?: string | object, obj?: object) => string
}

const ColorSelect: React.FC<ColorSelectProps> = ({ editor, iconStyles }) => {
  if (!editor) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton description="Select Text color" colSpan="3">
          <Palette
            className={iconStyles('textStyle', {
              color: editor.getAttributes('textStyle').color,
            })}
          />
        </ToolbarButton>
      </PopoverTrigger>

      <PopoverContent className="flex w-fit items-center gap-2 border-2 border-black bg-menu p-2">
        {colors.map(({ color, label }) => (
          <button
            key={label}
            onClick={() => editor.chain().focus().setColor(color).run()}
            className="size-5 rounded-sm border-2 border-black"
            style={{ backgroundColor: color }}
          />
        ))}

        <button
          onClick={() => editor.chain().focus().unsetColor().run()}
          className="rounded border-[1px] border-white bg-transparent p-1 text-sm text-white hover:border-black hover:bg-black"
        >
          Clear
        </button>
      </PopoverContent>
    </Popover>
  )
}

export default ColorSelect
