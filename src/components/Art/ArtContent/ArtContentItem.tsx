import Link from 'next/link'
import React from 'react'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RenderMedia from '@/components/RenderMedia'
import { cn } from '@/utilities/ui'
import { ArtWork } from '.'

const ArtContentItem: React.FC<ArtWork> = ({ title, artWorkImage, slug }) => (
  <div className="flex flex-col items-center gap-1">
    <Link href={`art/${slug}`}>
      <div className="relative size-16 overflow-hidden rounded-[10px] bg-white">
        {artWorkImage.media && typeof artWorkImage.media === 'object' ? (
          <RenderMedia media={artWorkImage.media} />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    </Link>

    <div className={cn('text-center font-serif text-white', 'max-w-16 truncate')}>{title}</div>
  </div>
)

export default ArtContentItem
