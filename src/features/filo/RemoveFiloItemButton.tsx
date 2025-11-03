import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { RemoveFiloItemButtonProps } from './types'

export function RemoveFiloItemButton({ onClick, disabled }: RemoveFiloItemButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size="icon"
      className="absolute right-1 top-1 size-8 rounded-full bg-black/50 p-1 text-white"
    >
      <X className="size-5" />
    </Button>
  )
}
