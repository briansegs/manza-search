import { type ResourceSection as ResourceSectionType } from '@/payload-types'
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
  const { resourceType, id } = props

  if (!resourceType) {
    console.warn(`ResourceSection missing "resourceType" on block id: ${id}`)
    return null
  }

  const ResourceToRender = resource[resourceType as keyof typeof resource]

  if (!ResourceToRender) {
    console.warn(`Unknown ResourceSection resourceType "${resourceType}" on block id: ${id}`)
    return null
  }

  return <ResourceToRender {...props} />
}
