import { Expand } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'

import { cn } from '@/utilities/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export type ReaderMenuTextEnlargeButtonProps = {
  textEnlarge: boolean
  setTextEnlarge: Dispatch<SetStateAction<boolean>>
}

export function ReaderMenuTextEnlargeButton({
  textEnlarge,
  setTextEnlarge,
}: ReaderMenuTextEnlargeButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ReaderMenuButton
          className={cn(textEnlarge && 'bg-secondary/80')}
          onClick={() => setTextEnlarge(!textEnlarge)}
        >
          <Expand />
        </ReaderMenuButton>
      </TooltipTrigger>

      <TooltipContent>Text Enlarge</TooltipContent>
    </Tooltip>
  )
}
