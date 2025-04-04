import React, { Fragment } from 'react'

import {
  AdSection as AdSectionBlockType,
  ContentSection as ContentSectionType,
  ResourceSection as ResourceSectionType,
} from '@/payload-types'

import { AdSectionBlock } from './article-blocks/AdSection/Component'
import { ContentSection } from './article-blocks/ContentSection/Component'
import { ResourceSection } from './article-blocks/ResourceSection/Component'

const blockComponents = {
  adSection: AdSectionBlock,
  contentSection: ContentSection,
  resourceSection: ResourceSection,
}

export const RenderArticleBlocks: React.FC<{
  blocks: (AdSectionBlockType | ContentSectionType | ResourceSectionType)[] | null
}> = ({ blocks }) => {
  const validBlocks = Array.isArray(blocks) ? blocks : []
  if (validBlocks.length > 0) {
    return (
      <Fragment>
        {blocks?.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-[2px]" key={index} id={block.id ?? undefined}>
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
