import { cn } from '@/utilities/ui'

export type BookCardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  ref?: React.Ref<HTMLButtonElement>
}

const buttonStyles =
  'size-14 rounded-full border-4 border-white bg-black text-xl text-white hover:bg-black hover:text-secondary-blue px-4 py-2'

const baseStyles =
  'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

export function BookCardButton({ className, ref, ...props }: BookCardButtonProps) {
  return <button ref={ref} className={cn(baseStyles, buttonStyles, className)} {...props} />
}
