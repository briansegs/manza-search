'use client'

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { FiloDialogHeader } from './FiloDialogHeader'
import { useFiloActions, useFiloOpen, useFiloSection } from '@/stores/filoStore'
import { useFiloContent } from './useFiloContent'
import { FiloTabs } from './FiloTabs'

export function FiloDialog() {
  const open = useFiloOpen()
  const { setOpen } = useFiloActions()
  const section = useFiloSection()
  const { sections, isPending } = useFiloContent()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby="Filo content"
        className="flex h-[560px] flex-col gap-2 border-2 border-black bg-primary-blue p-4 sm:p-6"
        closeButtonStyles="hidden"
      >
        <FiloDialogHeader setOpen={setOpen} />

        <DialogDescription className="sr-only">
          A list of tabs that filo content when clicked
        </DialogDescription>

        <FiloTabs sections={sections} defaultSection={section} isPending={isPending} />
      </DialogContent>
    </Dialog>
  )
}
