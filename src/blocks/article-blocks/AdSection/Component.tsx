import { CMSLink } from '@/components/Link'
import { AdSection as AdSectionProps } from '@/payload-types'
import React from 'react'
import { renderMedia, renderPlaceholder, TitleBar } from '../components'

export const AdSectionBlock: React.FC<AdSectionProps> = (props) => {
  const { title, ads } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content flex w-full flex-wrap justify-around gap-6 px-4 py-4 md:px-16 md:py-12">
        {ads && ads.length > 0 ? (
          ads.map(({ id, link, media }) => {
            const hasValidLink =
              link && (link.type === 'reference' ? link.reference : link.type === 'custom')

            return (
              <div
                key={id}
                className="border-content relative h-64 w-96 overflow-hidden rounded-lg hover:shadow-[10px_10px_10px_#60b3d3]"
              >
                {hasValidLink ? (
                  <CMSLink {...link}>{media ? renderMedia(media) : renderPlaceholder()}</CMSLink>
                ) : media ? (
                  renderMedia(media)
                ) : (
                  renderPlaceholder()
                )}
              </div>
            )
          })
        ) : (
          <div className="py-4 text-center">No advertisements available</div>
        )}
      </div>
    </div>
  )
}
