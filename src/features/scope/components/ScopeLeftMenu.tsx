import { ScrollToSection } from '@/features/shared/components/ScrollToSection'
import scrollToTop from '@/utilities/scrollToTop'
import { cn } from '@/utilities/ui'
import React from 'react'
import { LeftMenuProps } from '../types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'

export function ScopeLeftMenu({ sectionData }: LeftMenuProps) {
  return (
    <ul
      className={cn(
        'flex flex-col gap-2',
        'font-serif text-white',
        'px-4',
        'custom-scrollbar overflow-auto',
      )}
    >
      <li>
        <button onClick={scrollToTop} className="text-sm hover:text-secondary-blue">
          TOP
        </button>
        <Separator className="mt-2" />
      </li>

      <Accordion type="single" collapsible>
        {sectionData.map((data, index) => {
          if (!data) return null
          const { topic, articlesByCategory } = data

          const hasArticles = articlesByCategory.some(({ articles }) => articles.length > 0)

          if (articlesByCategory.length === 0 || !hasArticles) return null

          return (
            <AccordionItem value={`item-${index + 1}`} key={topic.id}>
              <AccordionTrigger>{topic.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {articlesByCategory.map(({ articles, category }) => {
                    if (!articles || articles.length === 0) return null

                    return (
                      <li key={category.id} className="hover:text-secondary-blue">
                        <ScrollToSection
                          className="max-w-[107px] truncate capitalize"
                          id={category.slug || ''}
                        >
                          {category.title}
                        </ScrollToSection>
                      </li>
                    )
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      <li className="hover:text-secondary-blue">
        <Separator className="mb-2" />

        <ScrollToSection className="text-sm capitalize" id="misc">
          Miscellaneous
        </ScrollToSection>
      </li>
    </ul>
  )
}
