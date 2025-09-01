import Link from 'next/link'
import React from 'react'
import { RelatedImagesProps } from './types'

export function RelatedImages({ images }: RelatedImagesProps) {
  const hasImages = images && Array.isArray(images) && images.length > 0

  return (
    <div className="bg-black">
      <div className="container flex w-full gap-4 overflow-x-auto py-1">
        {hasImages &&
          images?.map((imageItem) => {
            if (typeof imageItem === 'object' && imageItem !== null) {
              const { id, title, slug } = imageItem

              return (
                <Link key={id} href={`/articles/${slug}/images`}>
                  <div className="flex justify-center whitespace-nowrap rounded-[8px] bg-white px-3 py-[2px] font-medium hover:text-secondary-blue">
                    {title}
                  </div>
                </Link>
              )
            }
            return null
          })}
      </div>
    </div>
  )
}
