import React from 'react'
import PageClient from './page.client'
import { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ScopeTopMenuContainer } from '@/features/scope/components/ScopeTopMenuContainer'
import { ScopeLeftMenuContainer } from '@/features/scope/components/ScopeLeftMenuContainer'
import { ScopeContent } from '@/features/scope/components/ScopeContent'
import { SuggestedArticles } from '@/features/shared/components/SuggestedArticles'
import { RightMenuContainer } from '@/features/shared/components/RightMenu'
import { BottomMenu } from '@/features/shared/components/BottomMenu'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { Scope as ScopeGlobalType } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  try {
    const categories = await payload.find({
      collection: 'categories',
      depth: 1,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
    })

    const articles = await payload.find({
      collection: 'articles',
      sort: '-updatedAt',
      depth: 1,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        heroImage: true,
      },
    })

    const ScopeData: ScopeGlobalType = await getCachedGlobal('scope', 1)()

    return (
      <section className="mb-24">
        <PageClient />
        <div className="min-h-screen w-full">
          <SuggestedArticles articles={ScopeData.suggestedArticles} />

          <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
            <h2 className="py-2 font-serif text-xl uppercase text-white">Scope HomePage</h2>
          </div>
          <ScopeLeftMenuContainer categories={categories?.docs} />

          <ScopeTopMenuContainer categories={categories?.docs} />

          <ScopeContent categories={categories?.docs} articles={articles?.docs} />

          <RightMenuContainer />

          <BottomMenu />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error: ', error)

    return (
      <section className="mb-24">
        <PageClient />
        <div className="flex min-h-screen w-full items-center justify-center">
          <h2 className="text-xl">Unable to load scope data. Please try again later.</h2>
        </div>
      </section>
    )
  }
}

export function generateMetadata(): Metadata {
  return {
    title: `Scope | Manza Search`,
  }
}
