import { Button } from '@/components/ui/button'
import { SigninButtonProps } from '../types'

export function SigninButton({ children, disabled, ...props }: SigninButtonProps) {
  return (
    <Button
      disabled={disabled}
      className="w-full rounded-[10px] bg-black font-semibold disabled:bg-slate-700 sm:w-96 xl:w-full"
      {...props}
    >
      {children}
    </Button>
  )
}
