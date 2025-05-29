import { Media } from '@/components/Media'
import { Media as MediaType } from '@/payload-types'

import React from 'react'

const RenderMedia: React.FC<{ media: string | MediaType }> = ({ media }) => {
  console.log('media: ', media)

  return <Media resource={media} imgClassName="size-full object-cover" fill />
}

export default RenderMedia
