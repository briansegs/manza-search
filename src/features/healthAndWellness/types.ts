import { HealthAndWellness } from '@/payload-types'

export type HealthAndWellnessHeroProps = {
  ads: HealthAndWellness['pageAds']
}

export type Item = {
  slug: string
  title: string
  itemImage: { media: null }
}

export type HealthAndWellnessCategory = {
  slug: string
  title: string
  id?: string
  items: Item[]
}

export type HealthAndWellnessContentProps = {
  content: HealthAndWellnessCategory[] | null | undefined
}
