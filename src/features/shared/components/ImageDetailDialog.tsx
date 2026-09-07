import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import RichText from '@/components/RichText'
import { ExternalLink } from 'lucide-react'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { CMSLink, CMSLinkType } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { ArticleMedia } from '@/payload-types'
import React from 'react'

type ImageDetailDialogProps = {
  image?: string | null | ArticleMedia
  hasValidLink: boolean
  link?: CMSLinkType
  triggerClassName: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export function ImageDetailDialog({
  image,
  hasValidLink,
  link,
  triggerClassName,
  style,
  children,
}: ImageDetailDialogProps) {
  const content = image ? <RenderMedia media={image} /> : <ImagePlaceholder />

  const alt = typeof image === 'object' && image ? image.alt : undefined
  const caption = typeof image === 'object' && image ? image.caption : undefined

  return (
    <Dialog>
      <div className={triggerClassName} style={style}>
        <DialogTrigger asChild>
          <button className="block size-full cursor-pointer" aria-label={alt || 'Open image'}>
            {content}
          </button>
        </DialogTrigger>

        {children}
      </div>

      <DialogTitle className="sr-only">{alt || 'Image'}</DialogTitle>
      <DialogDescription className="sr-only">Image dialog content</DialogDescription>

      <DialogContent
        aria-description="Image dialog content"
        className={cn(
          'flex flex-col gap-4 border-black bg-menu sm:flex-row',
          'h-full max-h-[90%] w-full max-w-full sm:max-w-[80%]',
          'p-4 sm:p-6',
        )}
        closeButtonStyles="text-white"
      >
        <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-primary sm:h-full sm:w-1/2">
          {content}
        </div>

        <div className="flex w-full flex-col gap-4 text-white sm:w-1/2">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {alt && <div className="font-serif text-lg">{alt}</div>}

            {caption && <RichText data={caption} enableGutter={false} />}
          </div>

          {hasValidLink && (
            <CMSLink {...link} appearance="default" className="flex items-center justify-center gap-2">
              <ExternalLink className="size-4" />
              View source
            </CMSLink>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
