import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utilities/ui'
import { Spinner } from '@/components/ui/spinner'
import { FiloContentCard } from './FiloContentCard'
import { FiloContent } from './types'

type Section = {
  name: string
  content: FiloContent[] | null
  removeFn?: (args: { contentId: string }) => Promise<void> | null
  pending?: boolean
}

export function FiloTabs({
  sections,
  defaultSection,
  isPending,
}: {
  sections: Section[]
  defaultSection: string
  isPending: boolean
}) {
  return (
    <Tabs defaultValue={defaultSection} className="flex min-h-0 w-full flex-1 flex-col">
      <TabsList className="flex h-fit w-full flex-wrap gap-2 bg-black py-2">
        {sections.map((section) => (
          <TabsTrigger
            key={section.name}
            value={section.name}
            className={cn(
              'bg-white capitalize text-black',
              'aria-[selected=false]:hover:bg-secondary-blue aria-[selected=false]:hover:text-white data-[state=active]:bg-secondary-blue data-[state=active]:text-white',
            )}
          >
            {section.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map((section, i) => (
        <TabsContent
          key={section.name + i}
          value={section.name}
          className="custom-scrollbar relative mx-auto w-full flex-1 overflow-y-scroll p-0"
        >
          <div className="flex h-full w-full flex-wrap justify-center gap-6 pl-2 text-white sm:justify-start">
            {section.content?.map((content) => (
              <FiloContentCard
                key={content.id}
                content={content}
                removeFn={section.removeFn}
                pending={section.pending}
                name={section.name}
              />
            ))}

            {isPending && (
              <div className="mt-4 flex w-full items-center justify-center">
                <Spinner className="h-12 w-12" />
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
