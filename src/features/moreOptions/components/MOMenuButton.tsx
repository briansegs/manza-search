import { cn } from '@/utilities/ui'

const buttonStyles =
  'size-14 rounded-full border-4 border-black font-serif text-white shadow-[10px_10px_10px_black] hover:text-white/50'

type MOMenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  ref?: React.Ref<HTMLButtonElement>
}

export function MOMenuButton({ className, ref, ...props }: MOMenuButtonProps) {
  return <button ref={ref} className={cn(buttonStyles, className)} {...props} />
}
