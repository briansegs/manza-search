import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

import React from 'react'

type RenderMediaProps = {
  media: string | MediaType
  quality?: number | string
  size?: string
}

export function RenderMedia({ media, quality, size }: RenderMediaProps) {
  return (
    <Media
      resource={media}
      quality={quality}
      size={size}
      imgClassName="size-full object-cover"
      fill
    />
  )
}
