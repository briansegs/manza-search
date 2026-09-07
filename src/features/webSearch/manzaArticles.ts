import 'server-only'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { WebResult } from './types'

export async function searchManzaArticles(query: string, hostname: string): Promise<WebResult[]> {
  const payload = await getPayload({ config: configPromise })

  const articles = await payload.find({
    collection: 'search',
    depth: 0,
    limit: 5,
    select: {
      title: true,
      slug: true,
      meta: true,
    },
    where: {
      or: [
        { title: { like: query } },
        { 'meta.description': { like: query } },
        { 'meta.title': { like: query } },
        { slug: { like: query } },
        { 'categories.title': { like: query } },
        { 'authors.name': { like: query } },
      ],
    },
  })

  return articles.docs
    .filter((article) => article.slug)
    .map((article) => ({
      title: article.meta?.title || article.title || '',
      url: `/articles/${article.slug}`,
      description: article.meta?.description || '',
      hostname,
    }))
}
