import { Folder } from 'lucide-react'
import { MOMenuButton } from './MOMenuButton'
import { useFiloActions } from '@/stores/filoStore'

export function FiloButton({ ...props }) {
  const { setOpen } = useFiloActions()

  return (
    <MOMenuButton
      className="bg-[#c9a227]"
      aria-label="Open filo"
      onClick={() => setOpen(true)}
      {...props}
    >
      <Folder className="size-6" />
    </MOMenuButton>
  )
}
