import React, { ReactNode } from 'react'
import MenuButton from './MenuButton'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Article } from '@/payload-types'
import { CMSLink } from '../Link'
import ScrollToSection from './ScrollToSection'
import { sectionTitle } from '@/utilities/getSectionTitles'

interface PopoverButtonProps {
  data?: (string | NonNullable<Article['otherVerifiedSources']>[number] | sectionTitle)[]
  children: ReactNode
  dark?: boolean
}

const isSectionTitle = (item: unknown): item is sectionTitle =>
  typeof item === 'object' && item !== null && 'title' in item && 'id' in item

const isOtherVerifiedSource = (
  item: unknown,
): item is NonNullable<Article['otherVerifiedSources']>[number] =>
  typeof item === 'object' && item !== null && 'label' in item && 'id' in item

const PopoverButton: React.FC<PopoverButtonProps> = ({ data, children, dark }) => (
  <Popover>
    <PopoverTrigger asChild>
      <MenuButton dark={dark}>{children}</MenuButton>
    </PopoverTrigger>
    {data && (
      <PopoverContent
        className="bg-menu w-fit rounded-lg border-2 border-black py-2 font-serif text-white"
        side="right"
      >
        <ul className="flex flex-col">
          {data.length > 0 ? (
            data.map((item, index) => {
              if (typeof item === 'string') return <li key={index}>{item}</li>

              if (isSectionTitle(item)) {
                const { id, title } = item
                return (
                  <li key={id} className="hover:text-secondary-blue">
                    <ScrollToSection className="capitalize" id={id ?? ''}>
                      {title}
                    </ScrollToSection>
                  </li>
                )
              }

              if (isOtherVerifiedSource(item)) {
                const { id, link, label } = item
                return (
                  <li key={id}>
                    {link?.url ? (
                      <CMSLink {...link} className="hover:text-secondary-blue">
                        {label}
                      </CMSLink>
                    ) : (
                      label
                    )}
                  </li>
                )
              }
              return null
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
