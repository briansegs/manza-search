import React from 'react'
import { CMSLink } from '../Link'
import { renderMedia, renderPlaceholder } from '@/blocks/article-blocks/components'
import { Article, HomeMedia, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { isValidLink } from '@/utilities/isValidLink'

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

const HomeAd: React.FC<HomeAdProps> = async ({ enableLink, link, media }) => {
  const hasValidLink = isValidLink(link)

  return (
    <div
      className={cn(
        'relative mt-4 h-[588px] w-52 self-center border-2 border-black',
        'xl:mt-20 xl:self-start',
      )}
    >
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
