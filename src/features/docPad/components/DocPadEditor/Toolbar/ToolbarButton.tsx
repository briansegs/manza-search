import * as React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utilities/ui'

const buttonStyles =
  'flex h-8 w-full items-center justify-center rounded-sm border-2 border-black bg-menu'

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  description?: string
  colSpan?: string
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  colSpan,
  className,
  description,
  ...props
}) => {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn({
          'col-span-2': colSpan === '2' || !colSpan,
          'col-span-3': colSpan === '3',
          'col-span-6': colSpan === '6',
        })}
        asChild
      >
        <button className={cn(buttonStyles, className)} {...props} />
      </TooltipTrigger>
      {description && (
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}

export default ToolbarButton
