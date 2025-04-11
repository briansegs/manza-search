import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React, { Suspense } from 'react'
import { LoaderCircle } from 'lucide-react'

const DocPadContent = React.lazy(() => import('./DocPadContent'))

const DocPad: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-fit rounded-[8px] border-2 border-white bg-menu px-1 py-[1px] font-serif font-semibold text-white hover:bg-black">
          DOC PAD
        </Button>
      </PopoverTrigger>

      <Suspense
        fallback={
          <PopoverContent
            side="top"
            className="w-[100vw] rounded-primary border-4 border-black bg-menu px-2 pb-2 pt-0 lg:w-[80vw]"
          >
            <div className="flex w-full flex-col items-center gap-7">
              <div className="h-fit rounded-b-[8px] border-[1px] border-white bg-black px-14 py-[1px] font-serif font-semibold text-white">
                PAD
              </div>

              <div className="flex h-[355px] w-full items-center justify-center text-gray-500">
                <LoaderCircle className="mr-4 animate-spin" /> Loading editor...
              </div>
            </div>
          </PopoverContent>
        }
      >
        <DocPadContent />
      </Suspense>
    </Popover>
  )
}

export default DocPad
