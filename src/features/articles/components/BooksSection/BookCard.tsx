import { Book } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { BookCardButton } from '@/features/articles/components/BooksSection/BookCardButton'
import { BookReader } from '@/features/bookReader/components/BookReader'

type Meta = NonNullable<Book['meta']>

type BookCardProps = Pick<Book, 'content' | 'title'> &
  Pick<Meta, 'price' | 'shop'> & {
    hasValidLink: boolean
    coverImage: React.ReactNode
  }

export function BookCard({ shop, hasValidLink, coverImage, price, content, title }: BookCardProps) {
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
          <BookReader title={title} content={content} />
        </div>
      </div>
    </div>
  )
}
