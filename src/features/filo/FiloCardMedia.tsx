import dynamic from 'next/dynamic'
import { ImagePlaceholder } from '../shared/components/ImagePlaceholder'
import { FiloCardMediaProps } from './types'

const BookReader = dynamic(
  () => import('@/features/bookReader/components/BookReader').then((m) => m.BookReader),
  { ssr: false, loading: () => <ImagePlaceholder className="p-0 text-black" /> },
)

export function FiloCardMedia({ content, mediaElement, label }: FiloCardMediaProps) {
  if (content.type !== 'book') return mediaElement

  return (
    <BookReader book={content}>
      <button className="block size-full cursor-pointer" aria-label={label}>
        {mediaElement}
      </button>
    </BookReader>
  )
}
