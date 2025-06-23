import { Literature } from '@/payload-types'

export type LiteratureHeroProps = {
  ads: Literature['pageAds']
}

export type Book = {
  slug: string
  title: string
  bookImage: { media: null }
}

export type LiteratureCategory = {
  slug: string
  title: string
  id?: string
  books: Book[]
}

export type LiteratureContentProps = {
  content: LiteratureCategory[] | null | undefined
}
