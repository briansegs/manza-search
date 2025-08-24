import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { TabsContent } from '@/components/ui/tabs'
import { isValidLink } from '@/utilities/isValidLink'
import { CMSLink } from '@/components/Link'
import { AdSectionTabsContentProps } from './types'

export function AdSectionTabsContent({ id, ads }: AdSectionTabsContentProps) {
  return (
    <TabsContent key={id} value={id || ''} className="mx-auto">
      <div className="grid grid-cols-1 gap-6 p-2 lg:grid-cols-2 lg:p-6 2xl:grid-cols-3">
        {ads?.map(({ media, enableLink, link, id }) => {
          const hasValidLink = isValidLink(link)

          return (
            <div
              key={id}
              className="border-content relative aspect-[406/288] h-72 w-full max-w-[406px] flex-shrink-0 overflow-hidden rounded-primary hover:shadow-[10px_10px_10px_#60b3d3]"
            >
              {hasValidLink && enableLink ? (
                <CMSLink {...link}>
                  {media ? (
                    <RenderMedia media={media} />
                  ) : (
                    <ImagePlaceholder className="absolute inset-0" />
                  )}
                </CMSLink>
              ) : media ? (
                <RenderMedia media={media} />
              ) : (
                <ImagePlaceholder className="absolute inset-0" />
              )}
            </div>
          )
        })}
      </div>
    </TabsContent>
  )
}
