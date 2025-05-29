import Link from 'next/link'
import React from 'react'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RenderMedia from '@/components/RenderMedia'
import { cn } from '@/utilities/ui'
import { Article } from '@/payload-types'

type TravelContentItem = Pick<Article, 'title' | 'heroImage' | 'slug'>

const TravelContentItem: React.FC<TravelContentItem> = ({ title, heroImage, slug }) => (
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

export default TravelContentItem
