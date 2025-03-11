import React from 'react'

import { ImageSection as ImageSectionProps } from '@/payload-types'
import { renderMedia, renderPlaceholder, TitleBar } from '../components'

export const ImageSection: React.FC<ImageSectionProps> = (props) => {
  const { title, images } = props

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content w-full overflow-x-auto py-12">
        <div className="mx-auto flex w-fit gap-6 px-16">
          {images && images.length > 0 ? (
            images.map(({ media, id }) => (
              <div
                key={id}
                className="border-content relative h-72 w-96 flex-shrink-0 overflow-hidden rounded-lg"
              >
                {media ? renderMedia(media) : renderPlaceholder()}
              </div>
            ))
          ) : (
            <div className="py-4 text-center">No images available</div>
          )}
        </div>
      </div>
    </div>
  )
}
