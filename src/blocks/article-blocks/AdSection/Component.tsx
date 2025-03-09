import MissingImage from '@/components/ImageMissing'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { AdSection as AdSectionProps } from '@/payload-types'
import React from 'react'
import { TitleBar } from '../components'

export const AdSectionBlock: React.FC<AdSectionProps> = (props) => {
  const { title, ads } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content flex w-full justify-around gap-6 px-16 py-12">
        {ads?.map(({ id, link, media }) => (
          <div
            key={id}
            className="border-content relative h-64 w-96 overflow-hidden rounded-lg hover:border-menu-red"
          >
            {!link && !media && (
              <div className="flex h-full items-center justify-center bg-card p-4">
                <MissingImage />
              </div>
            )}
            {!link && media && (
              <Media resource={media} imgClassName="size-full object-cover" fill />
            )}
            {link && !media && (
              <CMSLink {...link}>
                <div className="flex h-full items-center justify-center bg-card p-4">
                  <MissingImage />
                </div>
              </CMSLink>
            )}
            {link && media && (
              <CMSLink {...link}>
                <Media resource={media} imgClassName="size-full object-cover" fill />
              </CMSLink>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
