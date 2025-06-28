import Link from 'next/link'
import React from 'react'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { cn } from '@/utilities/ui'
import { SoundContentItemProps } from '../types'

export function SoundContentItem({ title, heroImage, slug }: SoundContentItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
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
