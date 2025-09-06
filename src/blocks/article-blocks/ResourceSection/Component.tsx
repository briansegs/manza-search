import { type ResourceSection as ResourceSectionType } from '@/payload-types'
import React from 'react'
import { ImagesSection } from './Images/ImagesSection'
import { BooksSection } from './Books/BooksSection'
import { AudioSection } from './Audio/AudioSection'
import { VideosSection } from './Videos/VideosSection'
import { ShopSection } from './Shop/ShopSection'

const resource = {
  images: ImagesSection,
  books: BooksSection,
  audio: AudioSection,
  videos: VideosSection,
  shop: ShopSection,
} as const

type ResourceSectionProps = ResourceSectionType & {
  slug: string
}

export function ResourceSection(props: ResourceSectionProps) {
  const { type } = props

  if (!type) return null

  const ResourceToRender = resource[type]

  return <ResourceToRender {...props} />
}
