import React from 'react'

import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ResourceWithSlug } from '../types'
import { BooksClient } from './BooksSection.client'

export async function BooksSection(props: ResourceWithSlug) {
  const { slug } = props
  const { isEnabled: draft } = await draftMode()

  const books = await queryArticleBooksBySlug({ slug, draft })

  return <BooksClient books={books} {...props} />
}

const queryArticleBooksBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  try {
    const result = await payload.find({
      collection: 'articles',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: { slug: { equals: slug } },
      depth: 3,
    })

    const article = result.docs?.[0] || null

    return article?.books
  } catch (error) {
    console.error('Error querying article by slug:', error)
    return []
  }
})
