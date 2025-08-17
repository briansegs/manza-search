import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

import React from 'react'

export function RenderMedia({ media }: { media: string | MediaType }) {
  return <Media resource={media} imgClassName="size-full object-cover" fill />
}
