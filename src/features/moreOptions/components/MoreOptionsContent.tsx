'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { BookOpen, Compass, FileText, PartyPopper } from 'lucide-react'
import useBreakpoint from '@/hooks/useBreakpoint'
import { PopoverContent } from '@/components/ui/popover'
import { MOMenuButton } from './MOMenuButton'
import { Messenger } from '@/features/messenger/components/Messenger'
import { Calendar } from '@/features/calendar/components/Calendar'
import { MistralDialog } from '@/features/mistral/components/MistralDialog'
import { DashboardDialog } from './DashboardDialog'
import { FiloButton } from './FiloButton'
import { FiloDialog } from '@/features/filo/FiloDialog'

export function MoreOptionsContent() {
  const { isMobileSM } = useBreakpoint()
  const { isSignedIn } = useUser()

  const items = [
    <Calendar key="calendar" />,
    <MOMenuButton key="b" className="bg-[#0011ff]" aria-label="Books">
      <BookOpen className="size-6" />
    </MOMenuButton>,
    <MOMenuButton key="p" className="bg-[#0011ff]" aria-label="Pages">
      <FileText className="size-6" />
    </MOMenuButton>,
    <Messenger key="messenger" />,
    <MOMenuButton key="e" className="bg-[#8a1384]" aria-label="Events">
      <PartyPopper className="size-6" />
    </MOMenuButton>,
    <MOMenuButton key="k" className="bg-[#006c00]" aria-label="Explore">
      <Compass className="size-6" />
    </MOMenuButton>,
    <MistralDialog key="mistral" />,
    <DashboardDialog key="dashboard" />,
    <FiloButton key="filo" />,
  ]

  return (
    <>
      <PopoverContent
        side={isMobileSM ? 'bottom' : 'left'}
        sideOffset={isMobileSM ? 20 : 80}
        className="w-fit border-0 bg-transparent p-0 shadow-none"
      >
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.key} className="flex items-center justify-center">
              {item}
            </div>
          ))}
        </div>
      </PopoverContent>

      {isSignedIn && <FiloDialog />}
    </>
  )
}
