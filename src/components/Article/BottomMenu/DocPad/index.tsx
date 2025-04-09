import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React, { Suspense } from 'react'
import { LoaderCircle } from 'lucide-react'

const DocPadEditor = React.lazy(() => import('./DocPadEditor'))

const DocPad: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-fit rounded-[8px] border-2 border-white bg-menu px-1 py-[1px] font-serif font-semibold text-white hover:bg-black">
          DOC PAD
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={19}
        className="w-[80vw] rounded-b-none rounded-t-primary border-x-4 border-t-4 border-black bg-menu px-2 py-0"
      >
        <div className="flex w-full flex-col items-center gap-7">
          <div className="h-fit rounded-b-[8px] border-[1px] border-white bg-black px-14 py-[1px] font-serif font-semibold text-white">
            PAD
          </div>

          <Suspense
            fallback={
              <div className="flex h-[324px] w-full items-center justify-center text-gray-500">
                <LoaderCircle className="mr-4 animate-spin" /> Loading editor...
              </div>
            }
          >
            <DocPadEditor />
          </Suspense>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DocPad
