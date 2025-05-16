import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import NotFound from './not-found'
import RightMenuContainer from '@/components/RightMenuContainer'
import BottomMenu from '@/components/BottomMenu'
import { RenderHomeBlocks } from '@/blocks/RenderHomeBlocks'
import { Home as HomeGlobalType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import HomeMenu from '@/components/Home/HomeMenu'
import WelcomeBanner from '@/components/Home/WelcomeBanner'
import HomeAd from '@/components/Home/HomeAd'
import { cn } from '@/utilities/ui'
import SuggestedArticles from '@/components/SuggestedArticles'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const { isEnabled: draft } = await draftMode()

  const content: HomeGlobalType = await getCachedGlobal('home', 1)()

  if (!content) {
    return <NotFound />
  }

  const { layout, suggestedArticles, enableLink, link, media } = content

  return (
    <section className={cn('mb-0 h-full pb-4', 'xl:mb-24 xl:h-screen xl:pb-16')}>
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

        <HomeAd enableLink={enableLink} link={link} media={media} />
      </div>

      <RightMenuContainer />

      <BottomMenu />
    </section>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Home | Manza Search`,
  }
}
