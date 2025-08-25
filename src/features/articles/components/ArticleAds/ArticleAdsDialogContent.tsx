import { ArticleAdsDialogContentProps } from './types'
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Tabs } from '@/components/ui/tabs'
import { AdSectionTabsList } from './AdSectionTabsList'
import { AdSectionTabsContent } from './AdSectionTabsContent'

export function ArticleAdsDialogContent({ adSections }: ArticleAdsDialogContentProps) {
  if (!adSections) return null

  const defaultTab = adSections[0]?.id ? adSections[0]?.id : undefined

  return (
    <DialogContent
      aria-describedby="Article Ads Content Tabs"
      className="custom-scrollbar max-h-[95%] overflow-y-auto border-2 border-black lg:max-w-[970px] 2xl:max-w-[1400px]"
    >
      <DialogTitle className="sr-only">Article Ads Content Tabs</DialogTitle>
      <DialogDescription className="sr-only">
        A list of tabs that display ads when clicked
      </DialogDescription>

      <Tabs defaultValue={defaultTab}>
        <AdSectionTabsList adSections={adSections} />

        {adSections?.map(({ title, id, ads }) => {
          if (!title && !id) return null
          return <AdSectionTabsContent key={id} id={id} ads={ads} />
        })}
      </Tabs>
    </DialogContent>
  )
}
