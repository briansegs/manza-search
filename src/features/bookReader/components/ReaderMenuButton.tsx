import { cn } from '@/utilities/ui'

type ReaderMenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  ref?: React.Ref<HTMLButtonElement>
}

export function ReaderMenuButton({ className, ref, ...props }: ReaderMenuButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const buttonStyles =
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 w-8 p-1.5 rounded-sm flex-shrink-0'
  return <button ref={ref} className={cn(baseStyles, buttonStyles, className)} {...props} />
}
