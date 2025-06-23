import Link from 'next/link'
import React from 'react'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { cn } from '@/utilities/ui'
import { Book } from '../types'

export function LiteratureContentItem({ title, bookImage, slug }: Book) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Link href={`books/${slug}`}>
        <div className="relative size-16 overflow-hidden rounded-[10px] bg-white">
          {bookImage.media && typeof bookImage.media === 'object' ? (
            <RenderMedia media={bookImage.media} />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </Link>

      <div className={cn('text-center font-serif text-white', 'max-w-16 truncate')}>{title}</div>
    </div>
  )
}
