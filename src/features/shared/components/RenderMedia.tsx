import { Media } from '@/components/Media'
import type {
  Media as MediaType,
  AdMedia,
  HomeMedia,
  LiteratureMedia,
  SoundMedia,
  ArtMedia,
  TravelMedia,
  HealthAndWellnessMedia,
  ArticleMedia,
} from '@/payload-types'

import React from 'react'

type AnyMedia =
  | MediaType
  | AdMedia
  | HomeMedia
  | LiteratureMedia
  | SoundMedia
  | ArtMedia
  | TravelMedia
  | HealthAndWellnessMedia
  | ArticleMedia

type RenderMediaProps = {
  media: string | AnyMedia
  quality?: number | string
  size?: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
}

export function RenderMedia({ media, quality, size, fill = true, className }: RenderMediaProps) {
  return (
    <Media
      resource={media}
      quality={quality}
      size={size}
      imgClassName={className ? className : 'size-full object-cover'}
      fill={fill}
    />
  )
}
