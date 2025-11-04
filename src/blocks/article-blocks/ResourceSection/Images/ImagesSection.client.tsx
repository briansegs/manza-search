'use client'

import TitleBar from '../../TitleBar'

import { isValidLink } from '@/utilities/isValidLink'
import { CMSLinkType } from '@/components/Link'
import { ArticleImagesLink } from '@/features/articles/components/ImagesSection/ArticleImagesLink'
import { ImageSectionImage } from '@/features/articles/components/ImagesSection/ImageSectionImage'
import { ImagesClientProps } from '../types'
import { useReadMode } from '@/stores/readModeStore'

export function ImagesClient(props: ImagesClientProps) {
  const readMode = useReadMode()

  const { title, imagesData, slug } = props

  const { internalImages = [], outsideImages = [] } = imagesData

  const images = outsideImages && outsideImages.length > 0 ? outsideImages : internalImages || []

  if (readMode) return null

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <TitleBar title={title} />

      <div className="border-content relative w-full">
        {images?.length > 0 && (
          <div className="absolute right-0 top-0">
            <ArticleImagesLink slug={slug} />
          </div>
        )}

        <div className="custom-scrollbar overflow-x-auto pb-4 pt-8 sm:pb-8">
          <div className="mx-auto flex w-fit gap-8 px-4 xl:px-16">
            {images?.length > 0 ? (
              images.map((item) => {
                const { image, id } = item

                const link = 'link' in item ? (item.link as CMSLinkType | undefined) : undefined
                const hasValidLink = isValidLink(link)

                return (
                  <ImageSectionImage
                    key={id}
                    hasValidLink={hasValidLink}
                    link={link}
                    image={image}
                  />
                )
              })
            ) : (
              <div className="py-4 text-center">No images available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
