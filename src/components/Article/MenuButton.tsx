'use client'

import { ButtonProps, buttonVariants } from '../ui/button'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utilities/ui'

interface MenuButtonProps extends ButtonProps {
  dark?: boolean
}

const MenuButton: React.FC<MenuButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  dark,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        buttonVariants({ className, size, variant }),
        dark
          ? 'bg-black font-sans text-sm hover:bg-black'
          : 'bg-transparent font-serif text-lg hover:bg-transparent',
        'hover:text-navBar',
      )}
      ref={ref}
      {...props}
    />
  )
}

export const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 100, behavior: 'smooth' })
  }
}

export default MenuButton
