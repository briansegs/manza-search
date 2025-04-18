import { cn } from '@/utilities/ui'
import * as React from 'react'

const TitleInput: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <input
      className={cn(
        'flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        'border-l-2 border-l-black',
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export default TitleInput
