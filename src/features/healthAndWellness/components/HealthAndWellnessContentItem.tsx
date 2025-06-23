import Link from 'next/link'
import React from 'react'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RenderMedia from '@/components/RenderMedia'
import { cn } from '@/utilities/ui'
import { Item } from '../types'

export function HealthAndWellnessContentItem({ title, itemImage, slug }: Item) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Link href={`health-and-wellness/${slug}`}>
        <div className="relative size-16 overflow-hidden rounded-[10px] bg-white">
          {itemImage.media && typeof itemImage.media === 'object' ? (
            <RenderMedia media={itemImage.media} />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </Link>

      <div className={cn('text-center font-serif text-white', 'max-w-16 truncate')}>{title}</div>
    </div>
  )
}
