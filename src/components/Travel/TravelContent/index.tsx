import { cn } from '@/utilities/ui'
import React from 'react'
import TravelContentItem from './TravelContentItem'
import { Article, Media, Travel } from '@/payload-types'
import RenderMedia from '@/components/RenderMedia'
import TravelContentContainer from './TravelContentContainer'

export interface TravelCategory {
  title: string
  slug: string
  articles: Article[]
}

export interface TravelAd {
  title: string
  slug: string
  ad: { media: Media }
}

type TravelContentBlock = TravelCategory | TravelAd

interface TravelContentProps {
  content: TravelCategory[] | null | undefined
  adImages: Travel['adImages']
}

const TravelContent: React.FC<TravelContentProps> = ({ content, adImages }) => {
  if (!content?.length) {
    return <NoContent />
  }

  const buildBlocks = (): TravelContentBlock[] => {
    const blocks: TravelContentBlock[] = []

    const tryPushCategory = (index: number) => {
      const category = content[index]
      if (category) {
        blocks.push(category)
      }
    }

    const tryPushAd = (index: number, label: string) => {
      if (!adImages || !adImages[index]) return null

      const adImage = adImages[index]
      if (adImage?.media && typeof adImage.media === 'object' && 'url' in adImage.media) {
        blocks.push({
          title: label,
          slug: `ad-${index + 1}`,
          ad: { media: adImage.media as Media },
        })
      }
    }

    // Manual ordering of items
    tryPushCategory(0)
    tryPushAd(0, 'Ad 1')
    tryPushCategory(1)
    tryPushAd(1, 'Ad 2')
    tryPushCategory(2)
    tryPushCategory(3)
    tryPushCategory(4)
    tryPushAd(2, 'Ad 3')
    tryPushCategory(5)
    tryPushAd(3, 'Ad 4')
    tryPushCategory(6)

    return blocks
  }

  const blocks = buildBlocks()

  return (
    <div
      className={cn(
        'flex w-full flex-wrap justify-center gap-12',
        'mt-1 px-2',
        'lg:mt-12 lg:px-32',
      )}
    >
      {blocks.map((block) => {
        return (
          <TravelContentContainer
            key={block.slug}
            slug={block.slug}
            title={block.title}
            ad={'ad' in block ? block.ad : undefined}
          >
            {'articles' in block &&
              (block.articles.length > 0 ? (
                <ArticlesList articles={block.articles} />
              ) : (
                <NoArticles />
              ))}

            {'ad' in block && <RenderMedia media={block.ad.media} />}
          </TravelContentContainer>
        )
      })}
    </div>
  )
}

interface ArticlesListProps {
  articles: Article[]
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => (
  <>
    {articles.map(({ title, heroImage, slug }) =>
      heroImage && typeof heroImage === 'object' ? (
        <TravelContentItem key={slug} heroImage={heroImage} title={title} slug={slug} />
      ) : null,
    )}
  </>
)

const NoContent = () => <div className="mt-6 w-full text-center">No content to display.</div>

const NoArticles = () => (
  <p className="mt-10 text-center text-sm italic text-muted-foreground">No articles available.</p>
)

export default TravelContent
