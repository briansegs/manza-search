import { Article, Page } from '@/payload-types'

interface Link {
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?:
    | ({
        relationTo: 'pages'
        value: string | Page
      } | null)
    | ({
        relationTo: 'articles'
        value: string | Article
      } | null)
  url?: string | null
}

export const isValidLink = (link?: Link) => {
  if (link) {
    return (link.type === 'reference' && !!link.reference) || (link.type === 'custom' && !!link.url)
  }
  return false
}
