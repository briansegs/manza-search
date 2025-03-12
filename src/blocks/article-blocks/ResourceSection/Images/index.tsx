import React from 'react'
import { renderMedia, renderPlaceholder } from '../../components'
import { Media as MediaType } from '@/payload-types'

type ImagesType = {
  media: MediaType
  id: string
}

export const images: ImagesType[] = [
  {
    media: {
      alt: 'post 3',
      filename: 'image-post2.webp',
      mimeType: 'image/webp',
      filesize: 22332,
      width: 1920,
      height: 1080,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-07T15:02:33.969Z',
      updatedAt: '2025-03-07T15:02:33.969Z',
      id: '67cb0a89120502787d4d8360',
      url: '/api/media/file/image-post2.webp',
      thumbnailURL: '/api/media/file/image-post2-300x169.webp',
    },
    id: '67d0ada48f59c7a439a3055d',
  },
  {
    media: {
      alt: 'Blue wave',
      filename: 'blue-waves-1.webp',
      mimeType: 'image/webp',
      filesize: 6352,
      width: 548,
      height: 353,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-06T16:10:30.375Z',
      updatedAt: '2025-03-06T16:10:30.375Z',
      id: '67c9c8f679a0e42420f9611a',
      url: '/api/media/file/blue-waves-1.webp',
      thumbnailURL: '/api/media/file/blue-waves-1-300x193.webp',
    },
    id: '67d0ada88f59c7a439a3055f',
  },
  {
    media: {
      alt: 'post 3',
      filename: 'image-post2.webp',
      mimeType: 'image/webp',
      filesize: 22332,
      width: 1920,
      height: 1080,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-07T15:02:33.969Z',
      updatedAt: '2025-03-07T15:02:33.969Z',
      id: '67cb0a89120502787d4d8360',
      url: '/api/media/file/image-post2.webp',
      thumbnailURL: '/api/media/file/image-post2-300x169.webp',
    },
    id: '67d0adaa8f59c7a439a30561',
  },
  {
    media: {
      alt: 'Blue wave',
      filename: 'blue-waves-1.webp',
      mimeType: 'image/webp',
      filesize: 6352,
      width: 548,
      height: 353,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-06T16:10:30.375Z',
      updatedAt: '2025-03-06T16:10:30.375Z',
      id: '67c9c8f679a0e42420f9611a',
      url: '/api/media/file/blue-waves-1.webp',
      thumbnailURL: '/api/media/file/blue-waves-1-300x193.webp',
    },
    id: '67d0adac8f59c7a439a30563',
  },
  {
    media: {
      alt: 'post 3',
      filename: 'image-post2.webp',
      mimeType: 'image/webp',
      filesize: 22332,
      width: 1920,
      height: 1080,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-07T15:02:33.969Z',
      updatedAt: '2025-03-07T15:02:33.969Z',
      id: '67cb0a89120502787d4d8360',
      url: '/api/media/file/image-post2.webp',
      thumbnailURL: '/api/media/file/image-post2-300x169.webp',
    },
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
