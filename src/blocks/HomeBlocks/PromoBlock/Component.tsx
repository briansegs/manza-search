import { renderMedia, renderPlaceholder } from '@/blocks/article-blocks/components'
import { CMSLink } from '@/components/Link'
import { PromoBlock as PromoBlockProps } from '@/payload-types'
import { isValidLink } from '@/utilities/isValidLink'
import clsx from 'clsx'
import React from 'react'

const PromoBlock: React.FC<PromoBlockProps> = (props) => {
  const { title, content } = props

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={clsx(
          'w-[95%] border-4 border-black bg-primary-blue shadow-[10px_10px_10px_black]',
          'font-serif text-white',
          'pl-2',
        )}
      >
        {title}
      </div>

      <div className="flex max-w-[1075px] flex-wrap justify-center gap-14 px-4 py-12">
        {content && content.length > 0 ? (
          content.map(({ id, link, media }) => {
            const hasValidLink = isValidLink(link)

            return (
              <div
                key={id}
                className={clsx(
                  'relative h-40 w-72 flex-shrink-0 overflow-hidden border-2 border-black shadow-[10px_10px_10px_black] hover:border-red-500',
                )}
              >
                {hasValidLink ? (
                  <CMSLink {...link}>{media ? renderMedia(media) : renderPlaceholder()}</CMSLink>
                ) : media ? (
                  renderMedia(media)
                ) : (
                  renderPlaceholder()
                )}
              </div>
            )
          })
        ) : (
          <div className="py-4 text-center">No content available</div>
        )}
      </div>
    </div>
  )
}

export default PromoBlock
