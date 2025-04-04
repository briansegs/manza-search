import React, { ReactNode } from 'react'
import MenuButton from './MenuButton'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Article } from '@/payload-types'
import { CMSLink } from '../Link'

interface PopoverButtonProps {
  data?: string[] | Article['otherVerifiedSources']
  children: ReactNode
  dark?: boolean
}

const PopoverButton: React.FC<PopoverButtonProps> = ({ data, children, dark }) => (
  <Popover>
    <PopoverTrigger asChild>
      <MenuButton dark={dark}>{children}</MenuButton>
    </PopoverTrigger>
    {data && (
      <PopoverContent
        className="w-fit rounded-lg border-2 border-black bg-menu-primary py-2 font-serif text-white"
        side="right"
      >
        <ul className="flex flex-col">
          {data.length > 0 ? (
            data.map((item, index) => {
              if (typeof item === 'string') return <li key={index}>{item}</li>

              const { id, link, label } = item

              return (
                <li key={id}>
                  {link?.url ? (
                    <CMSLink {...link} className="hover:text-navBar">
                      {label}
                    </CMSLink>
                  ) : (
                    label
                  )}
                </li>
              )
            })
          ) : (
            <li>No data to display.</li>
          )}
        </ul>
      </PopoverContent>
    )}
  </Popover>
)

export default PopoverButton
