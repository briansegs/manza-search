import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Search, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export type FiloDialogHeaderProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function FiloDialogHeader({ setOpen }: FiloDialogHeaderProps) {
  return (
    <DialogHeader className="flex w-full flex-row items-center justify-between text-white">
      <DialogTitle className="uppercase">Filo</DialogTitle>

      <Search />

      <Button onClick={() => setOpen(false)} className="rounded-full bg-transparent" size="icon">
        <X />
      </Button>
    </DialogHeader>
  )
}
