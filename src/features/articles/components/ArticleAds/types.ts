import { ArticleAd } from '@/payload-types'
import type { ReactNode } from 'react'

// Base helpers
type AdCollection = NonNullable<ArticleAd['adCollections']>[number]
type AdGroup = AdCollection['adGroups'][number]
type AdSection = NonNullable<AdGroup['adSections']>[number]

// Narrow types
export type AdType = NonNullable<AdGroup['adType']>
export type AdGroups = AdCollection['adGroups']

// Props
export type ArticleAdsContainerProps = {
  ads: ArticleAd
}

export type ArticleAdsCarouselProps = {
  children: ReactNode
}

export type ArticleAdsCarouselContentProps = {
  adGroups: AdGroups
}

export type ArticleAdsCarouselItemProps = Pick<AdGroup, 'groupImage' | 'adType' | 'adSections'>

export type ArticleAdTypeBadgeProps = {
  adType: AdType
}

export type ArticleAdsDialogTriggerProps = Pick<AdGroup, 'groupImage' | 'adType'>

export type ArticleAdsDialogContentProps = Pick<AdGroup, 'adSections'>

export type AdSectionTabsListProps = Pick<AdGroup, 'adSections'>

export type AdSectionTabsContentProps = Pick<AdSection, 'ads' | 'id'>
