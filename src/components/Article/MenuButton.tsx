import { ButtonProps, buttonVariants } from '../../features/shared/components/ui/button'
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
        'hover:text-secondary-blue',
      )}
      ref={ref}
      {...props}
    />
  )
}

export default MenuButton
