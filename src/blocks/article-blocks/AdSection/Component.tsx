import { CMSLink } from '@/components/Link'
import { AdSection as AdSectionProps } from '@/payload-types'
import React from 'react'
import { renderMedia, renderPlaceholder, TitleBar } from '../components'

export const AdSectionBlock: React.FC<AdSectionProps> = (props) => {
  const { title, ads } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content flex w-full justify-around gap-6 px-16 py-12">
        {ads && ads.length > 0 ? (
          ads.map(({ id, link, media }) => {
            const hasValidLink =
              link && (link.type === 'reference' ? link.reference : link.type === 'custom')
            const hasValidMedia = media && media.url

            return (
              <div
                key={id}
                className="border-content relative h-64 w-96 overflow-hidden rounded-lg hover:border-menu-red"
              >
                {hasValidLink ? (
                  <CMSLink {...link}>
                    {hasValidMedia ? renderMedia(media) : renderPlaceholder()}
                  </CMSLink>
                ) : hasValidMedia ? (
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
