import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { SigninButtonProps } from '../types'

export function SigninButton({ children, className, disabled, ref, ...props }: SigninButtonProps) {
  return (
    <Button
      disabled={disabled}
      className={cn(className, 'w-full', 'sm:w-96 xl:w-full')}
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  )
}
