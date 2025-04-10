import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'
import clsx from 'clsx'
import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useState } from 'react'
import { Editor } from '@tiptap/react'

const headings = [
  {
    value: '1',
    label: 'Heading 1',
  },
  {
    value: '2',
    label: 'Heading 2',
  },
  {
    value: '3',
    label: 'Heading 3',
  },
  {
    value: '4',
    label: 'Heading 4',
  },
  {
    value: '5',
    label: 'Heading 5',
  },
  {
    value: '6',
    label: 'Heading 6',
  },
]

type HeadingSelectProps = {
  editor: Editor | null
}

const HeadingSelect: React.FC<HeadingSelectProps> = ({ editor }) => {
  const [open, setOpen] = useState(false)
  const currentLevel = editor?.getAttributes('heading')?.level || 'Normal'

  if (!editor) return null

  return (
    <Popover>
      <PopoverTrigger asChild className="col-span-6">
        <Button
          role="combobox"
          aria-expanded={open}
          className={clsx(
            'flex h-8 w-full items-center justify-between rounded-sm border-2 border-black bg-menu px-2 open:text-white hover:bg-transparent hover:text-secondary-blue',
            currentLevel.toString() !== 'Normal' ? 'text-secondary-blue' : 'text-white',
          )}
        >
          {currentLevel.toString() === 'Normal'
            ? 'Headings'
            : `Heading ${editor.getAttributes('heading')?.level}`}

          <ChevronsUpDown className="size-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex w-40 flex-col border-4 border-black bg-menu p-1">
        <Command className="rounded-none">
          <CommandList className="bg-menu">
            <CommandGroup>
              {headings.map((heading) => (
                <CommandItem
                  key={heading.value}
                  value={heading.value}
                  className="text-white"
                  onSelect={(currentValue) => {
                    setOpen(false)
                    const level = Number(currentValue)
                    return editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                      .run()
                  }}
                >
                  {heading.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      currentLevel.toString() === heading.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}

              <CommandItem
                key="normal"
                value="Normal"
                className="text-white"
                onSelect={() => {
                  setOpen(false)
                  return editor.chain().focus().setParagraph().run()
                }}
              >
                Normal
                <Check
                  className={cn(
                    'ml-auto',
                    currentLevel.toString() === 'Normal' ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default HeadingSelect
