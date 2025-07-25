import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CircleArrowLeft, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utilities/ui'
import { ChatHeaderProps } from './types'

export function ChatHeader({ setActiveConversation, imageUrl, name, options }: ChatHeaderProps) {
  return (
    <Card className="flex w-full items-center justify-between rounded-lg p-2">
      <div className="flex items-center gap-2">
        <Button
          className="block lg:hidden"
          variant="link"
          size="sm"
          onClick={() => setActiveConversation(null)}
        >
          <CircleArrowLeft />
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage src={imageUrl} />

          <AvatarFallback className="bg-white text-lg">{name?.substring(0, 1)}</AvatarFallback>
        </Avatar>

        <h2 className="font-semibold">{name}</h2>
      </div>

      <div className="flex gap-2">
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary">
                <Settings />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {options.map((option, id) => {
                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={option.onClick}
                    className={cn('font-semibold', {
                      'cursor-pointer text-destructive': option.destructive,
                    })}
                  >
                    {option.label}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </Card>
  )
}
