import Link from 'next/link'
import React from 'react'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { cn } from '@/utilities/ui'
import { TravelContentItem as TravelContentItemType } from '../types'

export function TravelContentItem({ title, heroImage, slug }: TravelContentItemType) {
  return (
    <div className="mt-10 flex flex-col items-center gap-1">
      <Link href={`articles/${slug}`}>
        <div className="relative size-16 overflow-hidden rounded-[10px] bg-white">
          {heroImage && typeof heroImage === 'object' ? (
            <RenderMedia media={heroImage} />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </Link>

      <div className={cn('text-center font-serif text-white', 'max-w-16 truncate')}>{title}</div>
    </div>
  )
}
