import { CMSLink } from '@/components/Link'
import { AdSection as AdSectionProps } from '@/payload-types'
import React from 'react'
import clsx from 'clsx'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RenderMedia from '@/components/RenderMedia'
import TitleBar from '../TitleBar'

export const AdSectionBlock: React.FC<AdSectionProps> = (props) => {
  const { title, ads } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content w-full overflow-x-auto py-4 md:py-8">
        <div className="mx-auto flex w-fit gap-6 px-4 xl:px-16">
          {ads && ads.length > 0 ? (
            ads.map(({ id, link, media }, index) => {
              const hasValidLink =
                link && (link.type === 'reference' ? link.reference : link.type === 'custom')

              return (
                <div
                  key={id}
                  className={clsx(
                    'border-content relative h-72 w-[406px] flex-shrink-0 overflow-hidden rounded-primary hover:shadow-[10px_10px_10px_#60b3d3]',
                    index === 0 ? 'hover:border-red-500' : '',
                    index === 1 ? 'hover:border-green-500' : '',
                    index === 2 ? 'hover:border-blue-500' : '',
                  )}
                >
                  {hasValidLink ? (
                    <CMSLink {...link}>
                      {media ? <RenderMedia media={media} /> : <ImagePlaceholder />}
                    </CMSLink>
                  ) : media ? (
                    <RenderMedia media={media} />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>
              )
            })
          ) : (
            <div className="py-4 text-center">No advertisements available</div>
          )}
        </div>
      </div>
    </div>
  )
}
