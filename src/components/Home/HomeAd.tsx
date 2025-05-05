import React, { cache } from 'react'
import { CMSLink } from '../Link'
import { renderMedia, renderPlaceholder } from '@/blocks/article-blocks/components'
import { Article, HomeMedia, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { isValidLink } from '@/utilities/isValidLink'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'

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

  let contentMedia: HomeMedia | null = null

  console.log('media: ', media)

  if (typeof media === 'string') {
    contentMedia = await queryMediaById(media)
  }

  if (typeof media === 'object') {
    contentMedia = media
  }

  return (
    <div
      className={cn(
        'relative mt-4 h-[588px] w-52 self-center border-2 border-black',
        'xl:mt-20 xl:self-start',
      )}
    >
      {hasValidLink && enableLink ? (
        <CMSLink {...link}>
          {contentMedia ? renderMedia(contentMedia) : renderPlaceholder()}
        </CMSLink>
      ) : contentMedia ? (
        renderMedia(contentMedia)
      ) : (
        renderPlaceholder()
      )}
    </div>
  )
}

const queryMediaById = cache(async (id: string) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.findByID({
    collection: 'home-media',
    draft,
    overrideAccess: draft,
    id: id,
  })

  return result || null
})

export default HomeAd
