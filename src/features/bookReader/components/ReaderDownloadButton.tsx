import { Download } from 'lucide-react'
import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ReaderDownloadButtonProps = {}

export function ReaderDownloadButton({}: ReaderDownloadButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ReaderMenuButton type="button" aria-label="Download book">
          <Download aria-hidden="true" />
        </ReaderMenuButton>
      </TooltipTrigger>

      <TooltipContent>Download Book</TooltipContent>
    </Tooltip>
  )
}
