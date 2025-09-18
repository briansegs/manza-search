import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ReaderNextPageButtonProps } from '../types'

export function ReaderNextPageButton({
  onClick,
  disabled,
  children,
  className,
}: ReaderNextPageButtonProps) {
  return (
    <Button
      size="icon"
      disabled={disabled}
      onClick={onClick}
      className={cn('bg-black py-16 hover:bg-primary hover:text-muted-foreground', className)}
    >
      {children}
    </Button>
  )
}
