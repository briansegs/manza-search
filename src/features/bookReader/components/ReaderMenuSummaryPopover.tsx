import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ReaderMenuSummaryPopoverProps } from '../types'

export function ReaderMenuSummaryPopover({ summary }: ReaderMenuSummaryPopoverProps) {
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild disabled={!summary}>
            <ReaderMenuButton className="text-xl font-bold">S</ReaderMenuButton>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Summary</TooltipContent>
      </Tooltip>

      <PopoverContent className="font-serif">
        <div className="text-lg font-bold">Summary</div>
        <Separator className="my-2" />
        {summary ? summary : 'No summary'}
      </PopoverContent>
    </Popover>
  )
}
