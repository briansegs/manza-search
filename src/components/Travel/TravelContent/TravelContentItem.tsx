import Link from 'next/link'
import React from 'react'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RenderMedia from '@/components/RenderMedia'
import { cn } from '@/utilities/ui'
import { Audio } from '.'

const TravelContentItem: React.FC<Audio> = ({ title, audioImage, slug }) => (
  <div className="flex flex-col items-center gap-1">
    <Link href={`audio/${slug}`}>
      <div className="relative size-16 overflow-hidden rounded-[10px] bg-white">
        {audioImage.media && typeof audioImage.media === 'object' ? (
          <RenderMedia media={audioImage.media} />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    </Link>

    <div className={cn('text-center font-serif text-white', 'max-w-16 truncate')}>{title}</div>
  </div>
)

export default TravelContentItem
