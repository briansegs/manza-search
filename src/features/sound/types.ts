import { Sound } from '@/payload-types'

export type SoundHeroProps = {
  ads: Sound['pageAds']
}

export type Audio = {
  slug: string
  title: string
  audioImage: { media: null }
}

export type SoundCategory = {
  slug: string
  title: string
  id?: string
  audio: Audio[]
}

export type SoundContentProps = {
  content: SoundCategory[] | null | undefined
}
