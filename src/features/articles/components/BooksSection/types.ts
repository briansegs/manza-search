import { Book } from '@/payload-types'

export type ArticleBooksLinkProps = { slug: string }

type Meta = NonNullable<Book['meta']>

export type BookCardProps = Pick<Book, 'content' | 'title' | 'id'> &
  Pick<Meta, 'price' | 'shop'> & {
    hasValidLink: boolean
    coverImage: React.ReactNode
  }
