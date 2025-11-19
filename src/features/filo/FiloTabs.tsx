import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utilities/ui'
import { Spinner } from '@/components/ui/spinner'
import { FiloContentCard } from './FiloContentCard'
import { FiloContent, FiloTabsProps, HistoryContent, ListedGroup } from './types'
import { Separator } from '@/components/ui/separator'
import { FiloListCard } from './FiloListCard'
import { FiloListHeader } from './FiloListHeader'
import { FiloHistoryCard } from './FiloHistoryCard'
import { FiloClearHistoryButton } from './FiloClearHistoryButton'

export function FiloTabs({ sections, defaultSection, isPending }: FiloTabsProps) {
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

      {sections.map((section) => (
        <TabsContent
          key={section.name}
          value={section.name}
          className="custom-scrollbar relative mx-auto w-full flex-1 overflow-y-scroll p-0"
        >
          <div className="flex h-full w-full flex-wrap justify-center gap-6 pl-2 text-white sm:justify-start">
            {section.name === 'lists' &&
              section.content?.map((content) => {
                const group = content as ListedGroup

                return (
                  <div key={group._id} className="w-full">
                    <FiloListHeader group={group} />

                    <Separator className="mb-4" />

                    <div className="flex flex-wrap gap-6">
                      {group.items.map((item) => {
                        return (
                          <FiloListCard
                            key={item.id}
                            content={item}
                            groupId={group._id}
                            removeFn={section.removeFn}
                            pending={section.pending}
                            name={section.name}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              })}

            {section.name === 'history' && (
              <div className="w-full space-y-2">
                <div className="my-2 flex justify-center">
                  <FiloClearHistoryButton disabled={!section?.content?.length} />
                </div>

                {section.content?.map((content, index) => {
                  const historyContent = content as HistoryContent

                  return (
                    <FiloHistoryCard
                      key={historyContent._id}
                      index={index}
                      historyContent={historyContent}
                      section={section}
                    />
                  )
                })}
              </div>
            )}

            {(section.name === 'pin' || section.name === 'save') &&
              section.content?.map((content) => {
                const group = content as FiloContent

                return (
                  <FiloContentCard
                    key={group.id}
                    content={group}
                    removeFn={section.removeFn}
                    pending={section.pending}
                    name={section.name}
                  />
                )
              })}

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
