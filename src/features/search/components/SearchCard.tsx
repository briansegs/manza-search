'use client'

import { Media } from '@/components/Media'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import { SearchCardProps } from '../types'

export function SearchCard({ doc }: SearchCardProps) {
  const { card, link } = useClickableCard({})
  if (!doc || !doc.meta) return null

  const { slug, categories, meta, title, authors, updatedAt, publishedAt } = doc
  const { description, image: metaImage } = meta

  const href = `/articles/${slug}`
  let publishedDate = ''

  if (publishedAt && typeof publishedAt === 'string') {
    const pDate = new Date(publishedAt as string)
    publishedDate = pDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const updatedDate = new Date(updatedAt as string).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article ref={card.ref}>
      <Card className="rounded-none border-4 border-black bg-white shadow-[10px_10px_10px_black] hover:cursor-pointer">
        <CardHeader className="flex flex-col gap-6 md:flex-row">
          <div className="relative h-40 w-64 flex-shrink-0 self-center overflow-hidden rounded-none border-2 border-black bg-white shadow-[10px_10px_10px_black] sm:self-start">
            {!metaImage && <div className="flex h-full items-center justify-center">No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              <Media resource={metaImage} imgClassName="size-full object-cover" fill />
            )}
          </div>

          <div className="flex w-full flex-col gap-4">
            <CardTitle className="font-serif text-3xl capitalize">
              <Link href={href} ref={link.ref}>
                {title}
              </Link>
            </CardTitle>

            <Separator />

            <CardDescription className="font-serif text-lg text-black">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {categories?.map((category) => {
            if (typeof category !== 'string') {
              return (
                <Card
                  className="border-2 border-black bg-slate-200 px-2 py-1 text-sm capitalize"
                  key={category.id}
                >
                  {category.title}
                </Card>
              )
            }

            return null
          })}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between font-serif">
          <div className="flex flex-col flex-wrap items-start gap-2 md:flex-row md:items-end">
            <span className="text-wrap text-xl capitalize">
              {authors.map((auther, index) => {
                return index < authors.length - 1 ? auther.name + ' | ' : auther.name
              })}
            </span>

            <div className="mt-2 lg:mt-0">
              <span className="mr-2"> -</span>
              <span className="text-base font-semibold">Published: </span>
              <span className="text-base">{publishedDate}</span>
            </div>
          </div>

          <div className="text-base">
            <span className="mr-2"> -</span>
            <span className="text-base font-semibold">Last Updated: </span>
            {updatedDate}
          </div>
        </CardFooter>
      </Card>
    </article>
  )
}
