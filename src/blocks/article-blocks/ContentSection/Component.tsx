import { ContentSection as ContentSectionProps, Media } from '@/payload-types'
import React from 'react'
import RichText from '@/components/RichText'

import clsx from 'clsx'
import ContentButtons from './ContentButtons'
import { cn } from '@/utilities/ui'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import TitleBar from '../TitleBar'

interface ImageContainerProps {
  image: string | Media
  className?: string
}

const ImageContainer = ({ image, className }: ImageContainerProps) => {
  if (!image) return null

  return (
    <div className="flex-shrink-0">
      <div
        className={cn('border-content relative w-64 overflow-hidden rounded-primary', className)}
      >
        {<RenderMedia media={image} />}
      </div>
    </div>
  )
}

export const ContentSection: React.FC<ContentSectionProps> = (props) => {
  const { title, alignment, image1, image2, content } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content flex w-full flex-col gap-4 px-4 py-4 sm:gap-8 sm:px-10 xl:flex-row">
        {image1 && (alignment === 'left' || alignment === 'left & right') && (
          <div className="mb-6 flex flex-col-reverse justify-between sm:flex-row xl:mb-0">
            <ImageContainer image={image1} className="h-[304px]" />

            <div className="mb-2 flex justify-end xl:hidden">
              <ContentButtons />
            </div>
          </div>
        )}

        <div className="w-full">
          <div
            className={clsx('mb-2 justify-end', alignment !== 'right' ? 'hidden xl:flex' : 'flex')}
          >
            <ContentButtons />
          </div>

          {alignment !== 'left & right' ? (
            <div className="flex w-full flex-col justify-between gap-8 lg:flex-row">
              {content && (
                <div className={clsx(image1 && alignment === 'right' && 'mt-2')}>
                  <RichText className="font-serif" data={content} enableGutter={false} />
                </div>
              )}

              {image1 && alignment === 'right' && (
                <ImageContainer image={image1} className="h-64" />
              )}
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-8 xl:flex-row">
              {content && (
                <div className="mt-2">
                  <RichText className="font-serif" data={content} enableGutter={false} />
                </div>
              )}

              {image2 && <ImageContainer image={image2} className="h-64" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
