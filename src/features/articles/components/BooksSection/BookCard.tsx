import { CMSLink } from '@/components/Link'
import { BookCardButton } from '@/features/articles/components/BooksSection/BookCardButton'
import { BookReader } from '@/features/bookReader/components/BookReader'
import { BookCardProps } from './types'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { isValidLink } from '@/utilities/isValidLink'

export function BookCard({ book }: BookCardProps) {
  const { title, content, meta } = book

  const { shop = {}, price = 0 } = meta || {}

  const cover = content?.cover

  const coverImage = cover ? <RenderMedia media={cover} /> : <ImagePlaceholder />

  const hasValidLink = isValidLink(shop.link)

  return (
    <div className="border-content h-fit overflow-hidden rounded-primary bg-primary-blue">
      <div className="relative h-96 w-[300px] flex-shrink-0">
        {shop?.enableLink && hasValidLink ? (
          <CMSLink {...shop?.link}>{coverImage}</CMSLink>
        ) : (
          coverImage
        )}
      </div>

      <div className="flex flex-col gap-2 p-2">
        <div className="mb-3 font-serif text-xl text-white">
          <div className="capitalize">{`Name: ${title}`}</div>
          <div className="flex gap-2">
            <span>Shop:</span>
            <span className="capitalize text-blue-300">
              {shop?.enableLink && hasValidLink ? (
                <CMSLink {...shop?.link}>{shop?.name}</CMSLink>
              ) : (
                shop?.name || 'Not available'
              )}
            </span>
          </div>
          <div>
            Price: <span className="text-blue-300">${price}</span>
          </div>
        </div>

        <div className="mb-3 flex justify-center gap-4">
          <BookCardButton>B</BookCardButton>
          <BookCardButton>A</BookCardButton>
          <BookCardButton>LM</BookCardButton>
          <BookReader book={book} />
        </div>
      </div>
    </div>
  )
}
