import { ArticleMenuButton } from './ArticleMenuButton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Article } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ScrollToSection } from '@/features/shared/components/ScrollToSection'
import { sectionTitle } from '@/utilities/getSectionTitles'
import { PopoverButtonProps } from '../types'

const isSectionTitle = (item: unknown): item is sectionTitle =>
  typeof item === 'object' && item !== null && 'title' in item && 'id' in item

const isOtherVerifiedSource = (
  item: unknown,
): item is NonNullable<Article['otherVerifiedSources']>[number] =>
  typeof item === 'object' && item !== null && 'label' in item && 'id' in item

export function ArticlePopoverButton({ data, children, dark }: PopoverButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ArticleMenuButton dark={dark}>{children}</ArticleMenuButton>
      </PopoverTrigger>
      {data && (
        <PopoverContent
          className="w-fit rounded-lg border-2 border-black bg-menu py-2 font-serif text-white"
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
}
