import React from 'react'
import { CMSLink } from '../Link'
import { renderMedia, renderPlaceholder } from '@/blocks/article-blocks/components'
import { Article, HomeMedia, Page } from '@/payload-types'

interface HomeAdProps {
  media?: (string | null) | HomeMedia
  enableLink?: boolean | null
  link?: {
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
}

const HomeAd: React.FC<HomeAdProps> = ({ enableLink, link, media }) => {
  const hasValidLink = link && (link.type === 'reference' ? link.reference : link.type === 'custom')

  return (
    <div className="relative mt-16 w-52 border-2 border-black">
      {hasValidLink && enableLink ? (
        <CMSLink {...link}>{media ? renderMedia(media) : renderPlaceholder()}</CMSLink>
      ) : media ? (
        renderMedia(media)
      ) : (
        renderPlaceholder()
      )}
    </div>
  )
}

export default HomeAd
