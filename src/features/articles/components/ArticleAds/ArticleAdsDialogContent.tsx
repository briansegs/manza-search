import { ArticleAdsDialogContentProps } from './types'
import { DialogContent } from '@/components/ui/dialog'
import { Tabs } from '@/components/ui/tabs'
import { AdSectionTabsList } from './AdSectionTabsList'
import { AdSectionTabsContent } from './AdSectionTabsContent'

export function ArticleAdsDialogContent({ adSections }: ArticleAdsDialogContentProps) {
  return (
    <DialogContent className="custom-scrollbar max-h-[95%] overflow-y-auto border-2 border-black lg:max-w-[970px] 2xl:max-w-[1400px]">
      <Tabs>
        <AdSectionTabsList adSections={adSections} />

        {adSections?.map(({ title, id, ads }) => {
          if (!title && !id) return null
          return <AdSectionTabsContent key={id} id={id} ads={ads} />
        })}
      </Tabs>
    </DialogContent>
  )
}
