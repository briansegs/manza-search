'use client'

import { ButtonProps, buttonVariants } from '../ui/button'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utilities/ui'

interface MenuButtonProps extends ButtonProps {
  scroll?: boolean
  dark?: boolean
  light?: boolean
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  scroll,
  dark,
  light,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 100, behavior: 'smooth' })
    }
  }
  return (
    <Comp
      className={cn(
        buttonVariants({ className, size, variant }),
        dark ? 'bg-black font-sans text-sm hover:bg-black hover:text-navBar' : '',
        light ? 'bg-transparent font-serif text-lg hover:bg-transparent hover:text-navBar' : '',
      )}
      ref={ref}
      {...props}
      onClick={() => {
        if (scroll) scrollToTop()
      }}
    />
  )
}
