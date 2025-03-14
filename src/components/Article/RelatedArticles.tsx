import { Article } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

export type Props = {
  articles: Article['relatedArticles']
}

const RelatedArticles: React.FC<Props> = (props) => {
  const { articles } = props

  const hasArticles = articles && Array.isArray(articles) && articles.length > 0

  return (
    <div className="bg-black">
      <div className="container flex w-full gap-4 overflow-x-auto py-1">
        {hasArticles &&
          articles?.map(({ id, title, slug }) => (
            <Link key={id} href={`/articles/${slug}`}>
              <div className="flex justify-center rounded-[8px] bg-white px-3 py-[2px] font-medium hover:text-navBar">
                {title}
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default RelatedArticles
