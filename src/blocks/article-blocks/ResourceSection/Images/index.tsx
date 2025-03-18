import React from 'react'
import { renderMedia, renderPlaceholder } from '../../components'
import { Media as MediaType } from '@/payload-types'

type ImagesType = {
  media?: MediaType
  id: string
}

export const images: ImagesType[] = [
  {
    id: '67d0ada48f59c7a439a3055d',
  },
  {
    id: '67d0ada88f59c7a439a3055f',
  },
  {
    id: '67d0adaa8f59c7a439a30561',
  },
  {
    id: '67d0adac8f59c7a439a30563',
  },
  {
    id: '67d0adae8f59c7a439a30565',
  },
]

const Images = () => {
  return (
    <>
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
    </>
  )
}

export default Images
