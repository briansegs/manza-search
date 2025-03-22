import { ContentSection as ContentSectionProps, Media } from '@/payload-types'
import React from 'react'
import { renderMedia, TitleBar } from '../components'
import RichText from '@/components/RichText'

import clsx from 'clsx'
import ContentButtons from './ContentButtons'

const ImageContainer = ({ image }: { image: Media }) => {
  if (!image) return null

  return (
    <div className="flex-shrink-0">
      <div className="border-content relative size-64 overflow-hidden rounded-lg">
        {renderMedia(image)}
      </div>
    </div>
  )
}

export const ContentSection: React.FC<ContentSectionProps> = (props) => {
  const { title, alignment, image1, image2, content } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content flex w-full flex-col gap-4 px-4 py-6 sm:gap-8 sm:px-16 sm:py-12">
        <div className="flex justify-end">
          <ContentButtons />
        </div>

        {alignment !== 'left & right' ? (
          <div
            className={clsx(
              'flex w-full flex-col justify-between gap-8',
              alignment === 'right' ? 'xl:flex-row-reverse' : 'xl:flex-row',
            )}
          >
            {image1 && <ImageContainer image={image1} />}

            {content && (
              <div className={clsx(image1 && 'mt-2')}>
                <RichText className="font-serif" data={content} enableGutter={false} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-between gap-8 xl:flex-row">
            {image1 && <ImageContainer image={image1} />}

            {content && (
              <div className={clsx((image1 || image2) && 'mt-2')}>
                <RichText data={content} enableGutter={false} />
              </div>
            )}

            {image2 && <ImageContainer image={image2} />}
          </div>
        )}
      </div>
    </div>
  )
}
