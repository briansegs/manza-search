'use client'

import RichText from '@/components/RichText'
import { ContentSection as ContentSectionProps } from '@/payload-types'
import { useTextSize } from '@/providers/TextSizeProvider'
import { cn } from '@/utilities/ui'

type RichTextWithTextSizeProps = Pick<ContentSectionProps, 'content'> & {
  className?: string
}

export const RichTextWithTextSize = ({ className, content }: RichTextWithTextSizeProps) => {
  const { textSize } = useTextSize()

  if (!content) return null

  return (
    <RichText
      className={cn(className, {
        'prose-p:text-base': textSize === 'off',
        'prose-p:text-lg': textSize === 'large',
        'prose-p:text-xl': textSize === 'x-large',
      })}
      data={content}
      enableGutter={false}
    />
  )
}
