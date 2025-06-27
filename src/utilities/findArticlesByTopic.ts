import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function findArticlesByTopic(topicSlug: string) {
  const payload = await getPayload({ config: configPromise })

  const topic = await payload.find({
    collection: 'topics',
    where: {
      slug: { equals: topicSlug },
    },
  })

  const topicId = topic.docs[0]?.id
  if (!topicId) return []

  const categories = await payload.find({
    collection: 'categories',
    depth: 2,
    where: {
      Topic: { equals: topicId },
    },
    select: {
      title: true,
      slug: true,
    },
  })

  const categoryIds = categories.docs.map((category) => category.id)

  const articles = await payload.find({
    collection: 'articles',
    depth: 2,
    where: {
      categories: {
        in: categoryIds,
      },
    },
  })

  const articlesByTopic = categories.docs.map((category) => {
    const relatedArticles = articles.docs.filter((article) =>
      article.categories?.some((c) => typeof c !== 'string' && c.id === category.id),
    )

    return {
      category: category,
      articles: relatedArticles,
    }
  })

  return articlesByTopic
}
