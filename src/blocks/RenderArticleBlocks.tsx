import React, { Fragment } from 'react'

import type { Article } from '@/payload-types'

import { AdSectionBlock } from './article-blocks/AdSection/Component'
import { ContentSection } from './article-blocks/ContentSection/Component'
import { ImageSection } from './article-blocks/ImageSection/Component'

const blockComponents = {
  adSection: AdSectionBlock,
  contentSection: ContentSection,
  imageSection: ImageSection,
}

export const RenderArticleBlocks: React.FC<{
  blocks: Article['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-8" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
