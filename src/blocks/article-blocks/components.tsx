import MissingImage from '@/components/ImageMissing'
import { Media } from '@/components/Media'
import { Media as MediaType } from '@/payload-types'

export const TitleBar = ({ title }: { title: string | null | undefined }) => (
  <div className="border-content w-full bg-header pl-10">
    <p className="min-h-[28px] font-serif text-lg capitalize text-white">{title || ''}</p>
  </div>
)

export const renderMedia = (media: MediaType) => (
  <Media resource={media} imgClassName="size-full object-cover" fill />
)

export const renderPlaceholder = () => (
  <div className="flex h-full items-center justify-center bg-card p-4">
    <MissingImage />
  </div>
)
