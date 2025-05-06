import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import NotFound from './not-found'
import RightMenuContainer from '@/components/Article/RightMenuContainer'
import BottomMenu from '@/components/Article/BottomMenu'
import { RenderHomeBlocks } from '@/blocks/RenderHomeBlocks'
import { Home as HomeCollectionType, HomeMedia } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import SuggestedArticles from '@/components/Home/SuggestedArticles'
import HomeMenu from '@/components/Home/HomeMenu'
import WelcomeBanner from '@/components/Home/WelcomeBanner'
import HomeAd from '@/components/Home/HomeAd'
import { cn } from '@/utilities/ui'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const { isEnabled: draft } = await draftMode()

  const content: HomeCollectionType = await getCachedGlobal('home', 1)()

  if (!content) {
    return <NotFound />
  }

  let contentMedia: HomeMedia | null = null

  const { layout, suggestedArticles, enableLink, link, media } = content

  if (typeof media === 'string') {
    contentMedia = await queryMediaById(media)
  }
  if (typeof media === 'object') {
    contentMedia = media
  }
  console.log('content: ', content)

  console.log('contentMedia: ', contentMedia)

  return (
    <section className={cn('h-full pb-4', 'xl:h-screen xl:pb-24')}>
      <PageClient />

      {draft && <LivePreviewListener />}

      <SuggestedArticles articles={suggestedArticles} />

      <div className={cn('mt-0 flex flex-col gap-2', 'xl:mt-10 xl:max-h-full xl:flex-row')}>
        <HomeMenu />

        <div className="flex flex-1 flex-col items-center">
          <WelcomeBanner />

          <div className="size-full overflow-y-auto border-[1px] border-black p-4">
            {layout && layout.length > 0 ? (
              <RenderHomeBlocks blocks={layout} />
            ) : (
              <div className="py-4 text-center">No content blocks available</div>
            )}
          </div>
        </div>

        <HomeAd enableLink={enableLink} link={link} media={contentMedia} />
      </div>

      <RightMenuContainer />

      <BottomMenu />
    </section>
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

export function generateMetadata(): Metadata {
  return {
    title: `Home | Manza Search`,
  }
}
