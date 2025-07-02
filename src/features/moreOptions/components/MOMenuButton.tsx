import { cn } from '@/utilities/ui'

const buttonStyles =
  'size-14 rounded-full border-4 border-black font-serif text-white shadow-[10px_10px_10px_black] hover:text-white/50'

type MOMenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

export function MOMenuButton({ className, ...props }: MOMenuButtonProps) {
  return <button className={cn(buttonStyles, className)} {...props} />
}
