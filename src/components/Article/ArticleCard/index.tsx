'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Article } from '@/payload-types'

import { Media } from '@/components/Media'
import MissingImage from '@/components/ImageMissing'
import { formatDateTime } from '@/utilities/formatDateTime'

export type CardArticleData = Pick<Article, 'slug' | 'categories' | 'meta' | 'title' | 'createdAt'>

export const ArticleCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardArticleData
  relationTo?: 'articles'
  showCategories?: boolean
  title?: string
  createdAt?: Date
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, createdAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn('flex rounded-lg border border-border bg-card hover:cursor-pointer', className)}
      ref={card.ref}
    >
      <div className="relative h-36 w-56 overflow-hidden">
        {!metaImage && (
          <div className="flex h-full items-center justify-center">
            <MissingImage />
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} imgClassName="size-full object-cover" fill />
        )}
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-col p-4">
          {showCategories && hasCategories && (
            <div className="mb-4 text-sm uppercase">
              {showCategories && hasCategories && (
                <div>
                  {categories?.map((category, index) => {
                    if (typeof category === 'object') {
                      const { title: titleFromCategory } = category

                      const categoryTitle = titleFromCategory || 'Untitled category'

                      const isLast = index === categories.length - 1

                      return (
                        <Fragment key={index}>
                          {categoryTitle}
                          {!isLast && <Fragment>, &nbsp;</Fragment>}
                        </Fragment>
                      )
                    }

                    return null
                  })}
                </div>
              )}
            </div>
          )}
          {titleToUse && (
            <div className="prose">
              <h3>
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {description && (
            <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>
          )}
        </div>

        <div className="flex items-center gap-1 pb-4 pl-4 text-sm text-slate-600">
          <p>Updated:</p>
          <time dateTime={createdAt}>{formatDateTime(createdAt)}</time>
        </div>
      </div>
    </article>
  )
}
