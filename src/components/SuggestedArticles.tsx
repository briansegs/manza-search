import Link from 'next/link'
import React from 'react'
import { Article } from '@/payload-types'

interface SuggestedArticlesProps {
  articles: (string | Article)[] | null | undefined
}

const SuggestedArticles: React.FC<SuggestedArticlesProps> = (props) => {
  const { articles } = props

  const hasArticles = articles && Array.isArray(articles) && articles.length > 0

  return (
    <div className="overflow-auto bg-black">
      <div className="container flex w-full gap-4 overflow-x-auto py-1">
        {hasArticles &&
          articles.map((article) => {
            if (typeof article === 'object' && article !== null) {
              const { id, title, slug } = article

              return (
                <Link key={id} href={`/articles/${slug}`}>
                  <div className="flex justify-center text-nowrap rounded-[8px] bg-white px-3 py-[2px] font-medium hover:text-secondary-blue">
                    {title}
                  </div>
                </Link>
              )
            }
            return null
          })}
      </div>
    </div>
  )
}

export default SuggestedArticles
