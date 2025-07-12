'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { UserButton } from '@clerk/nextjs'
import {
  activeConversationStateType,
  currentTabStateType,
  TabsType,
} from '../MessengerSidebarWrapper'
import { MessageSquare, Users } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { Badge } from '@/components/ui/badge'
import { useMemo } from 'react'

function UserButtonAppearance() {
  return <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-10 h-10' } }} />
}

type MessengerNavbarProps = Pick<activeConversationStateType, 'activeConversation'> &
  currentTabStateType

export function MessengerNavbar({
  currentTab,
  setCurrentTab,
  activeConversation,
}: MessengerNavbarProps) {
  const requestsCount = useQuery(api.requests.count)

  const conversations = useQuery(api.conversations.get)

  const unseenMessagesCount = useMemo(() => {
    return conversations?.reduce((acc, curr) => {
      return acc + curr.unseenCount
    }, 0)
  }, [conversations])

  const isActive = !!activeConversation

  const tabs = [
    {
      name: 'Conversations',
      slug: 'conversations',
      icon: <MessageSquare />,
      count: unseenMessagesCount,
    },
    {
      name: 'Friends',
      slug: 'friends',
      icon: <Users />,
      count: requestsCount,
    },
  ]

  return (
    <Card
      className={cn(
        'flex h-16 w-full flex-row items-center justify-between p-2',
        'lg:h-full lg:w-16 lg:flex-col lg:px-2 lg:py-4',
        isActive ? 'hidden lg:flex' : '',
      )}
      onFocusCapture={(e) => {
        // Prevent focus events from bubbling up to parent components
        e.stopPropagation()
      }}
    >
      <nav className="w-full">
        <ul
          className={cn(
            'flex items-center gap-4 lg:flex-col lg:justify-normal',
            'flex-row justify-evenly',
          )}
        >
          {tabs.map(({ name, slug, icon, count }, index) => {
            return (
              <li key={index} className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant={currentTab === slug ? 'default' : 'outline'}
                      onClick={() => setCurrentTab(slug as TabsType)}
                    >
                      {icon}
                    </Button>
                  </TooltipTrigger>

                  {count ? <Badge className="absolute bottom-7 left-6 px-2">{count}</Badge> : null}

                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            )
          })}

          <li className="flex items-center lg:hidden">
            <UserButtonAppearance />
          </li>
        </ul>
      </nav>

      <div className="hidden lg:flex">
        <UserButtonAppearance />
      </div>
    </Card>
  )
}
