import React, { Fragment } from 'react'

import type { PromoBlock as PromoBlockType } from '@/payload-types'

import PromoBlock from './HomeBlocks/PromoBlock/Component'

const blockComponents = {
  promoBlock: PromoBlock,
}

export const RenderHomeBlocks: React.FC<{
  blocks: PromoBlockType[] | null
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
                <div className="mb-2" key={index}>
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
