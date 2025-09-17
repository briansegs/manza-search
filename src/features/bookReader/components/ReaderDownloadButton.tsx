import { Download } from 'lucide-react'
import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ReaderDownloadButtonProps = {}

export function ReaderDownloadButton({}: ReaderDownloadButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <ReaderMenuButton>
          <Download />
        </ReaderMenuButton>
      </TooltipTrigger>

      <TooltipContent>Download Book</TooltipContent>
    </Tooltip>
  )
}
