import { renderMedia, renderPlaceholder } from '@/blocks/article-blocks/components'
import { Category, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

const Item = ({ title, slug, media }: { title: string; slug: string; media: Media }) => (
  <div className="flex flex-col items-center gap-1">
    <Link href={`articles/${slug}`}>
      <div className="relative size-16 overflow-hidden rounded-[10px] bg-white">
        {media ? renderMedia(media) : renderPlaceholder()}
      </div>
    </Link>

    <div className="text-center font-serif text-white">{title}</div>
  </div>
)

const Box = ({
  slug,
  title,
  articles,
}: {
  slug: string
  title: string
  articles: ScopeArticle[]
}) => (
  <div
    id={slug}
    className={cn(
      'h-80 w-96',
      'bg-primary-blue',
      'rounded-[10px] border-2 border-black',
      'space-y-12',
    )}
  >
    <div className="flex justify-center">
      <div
        className={cn(
          'border-x-2 border-b-2 border-white',
          'bg-black',
          'font-serif text-white',
          'px-2',
        )}
      >
        {title}
      </div>
    </div>

    <div className="flex w-full flex-wrap justify-center gap-4 px-8">
      {articles.map(({ id, title, slug: artileSlug, heroImage }) =>
        heroImage && typeof heroImage === 'object' ? (
          <Item media={heroImage} slug={artileSlug ? artileSlug : ''} title={title} key={id} />
        ) : null,
      )}
    </div>
  </div>
)

interface ScopeCategory {
  id: string
  title: string
  slug?: string | null | undefined
}

interface ScopeArticle {
  id: string
  title: string
  heroImage?: string | Media | null | undefined
  categories?: (string | Category)[] | null | undefined
  slug?: string | null | undefined
}

interface ScopeContentProps {
  categories?: ScopeCategory[]
  articles: ScopeArticle[]
}

const ScopeContent = ({ categories, articles }: ScopeContentProps) => {
  const miscArticles = articles.filter((article) => !article.categories)

  return (
    <div className={cn('flex w-full flex-wrap justify-center gap-12', 'mt-12 px-2', 'lg:px-32')}>
      {categories
        ? categories?.map((categorie) => {
            const { id, title, slug } = categorie

            const categorieArticles = articles.filter((article) => {
              if (article.categories) {
                return article.categories?.some((categorie) =>
                  typeof categorie !== 'string' ? categorie.slug === slug : false,
                )
              }

              return false
            })

            return categorieArticles ? (
              <Box articles={categorieArticles} slug={slug ? slug : ''} title={title} key={id} />
            ) : null
          })
        : null}

      {miscArticles ? <Box title="Miscellaneous" slug="misc" articles={miscArticles} /> : null}
    </div>
  )
}

export default ScopeContent
