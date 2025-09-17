import { Book } from '@/payload-types'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export type ReaderMenuInformationPopoverProps = Pick<Book['content'], 'information'>

export function ReaderMenuInformationPopover({ information }: ReaderMenuInformationPopoverProps) {
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild disabled={!information}>
            <ReaderMenuButton className="text-2xl font-bold">i</ReaderMenuButton>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Information</TooltipContent>
      </Tooltip>

      <PopoverContent className="font-serif">
        <div className="text-lg font-bold">Information</div>
        <Separator className="my-2" />
        {information ? information : 'No information'}
      </PopoverContent>
    </Popover>
  )
}
