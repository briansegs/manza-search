'use client'

import { ArticleMenuButton } from '../../components/ArticleMenuButton'
import { TextSizeOptions, useTextSize } from '@/providers/TextSizeProvider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'

const sizes: TextSizeOptions[] = ['off', 'large', 'x-large']

export function TextSizeButton() {
  const { textSize, setTextSize } = useTextSize()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ArticleMenuButton aria-label="Adjust text size">EXP</ArticleMenuButton>
      </PopoverTrigger>

      <PopoverContent className="flex w-32 flex-col items-center justify-center border-black bg-menu p-0">
        <ul className="w-full">
          {sizes.map((size) => {
            return (
              <li key={size}>
                <button
                  type="button"
                  onClick={() => setTextSize(size)}
                  className={cn(
                    'w-full cursor-pointer py-2 text-center font-serif capitalize text-white hover:bg-black hover:text-yellow-200',
                    {
                      'bg-black text-yellow-200': size === textSize,
                    },
                  )}
                >
                  {size}
                </button>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
