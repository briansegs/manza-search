import Link from 'next/link'
import React from 'react'
import { ScopeContentItemProps } from '../types'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RenderMedia from '@/components/RenderMedia'
import { cn } from '@/utilities/ui'

export function ScopeContentItem({ title, slug, media }: ScopeContentItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Link href={`articles/${slug}`}>
        <div className="relative size-16 overflow-hidden rounded-[10px] bg-white">
          {media ? <RenderMedia media={media} /> : <ImagePlaceholder />}
        </div>
      </Link>

      <div className={cn('text-center font-serif text-white', 'max-w-16 truncate')}>{title}</div>
    </div>
  )
}
