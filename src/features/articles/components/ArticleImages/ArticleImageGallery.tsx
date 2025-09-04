'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
  ImageGalleryTabsList,
  ImageGalleryTabsTrigger,
} from '@/features/articles/components/ArticleImages/ImageGalleryTabs'
import { ImageGallery } from './ImageGallery'
import { useState } from 'react'
import { ArticleImageGalleryProps } from './types'

type TabValue = 'outside-link' | 'manza-database'

export function ArticleImageGallery({
  externalImages,
  internalImages,
  hasOutsideImagesToLoad,
  hasInternalImagesToLoad,
  slug,
  imageLimit,
}: ArticleImageGalleryProps) {
  const [activeTab, setActiveTab] = useState<TabValue>('outside-link')

  const tabsConfig: {
    value: TabValue
    title: string
    images: typeof externalImages
    hasImagesToLoad: boolean
    imagesType: 'outside-images' | 'internal-images'
  }[] = [
    {
      value: 'outside-link',
      title: 'On Links',
      images: externalImages,
      hasImagesToLoad: hasOutsideImagesToLoad,
      imagesType: 'outside-images',
    },
    {
      value: 'manza-database',
      title: 'On Manza Database',
      images: internalImages,
      hasImagesToLoad: hasInternalImagesToLoad,
      imagesType: 'internal-images',
    },
  ]

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
      <div className="ml-0 flex flex-col items-center gap-0 sm:ml-12 sm:flex-row sm:gap-4">
        <div className="w-[200px] text-center font-serif text-2xl text-white sm:text-right">
          {tabsConfig.find((tab) => tab.value === activeTab)?.title}
        </div>
        <ImageGalleryTabsList className="gap-2">
          {tabsConfig.map((tab) => (
            <ImageGalleryTabsTrigger key={tab.value} value={tab.value}>
              {tab.value === 'outside-link' ? 'Links' : 'MDB'}
            </ImageGalleryTabsTrigger>
          ))}
        </ImageGalleryTabsList>
      </div>

      {tabsConfig.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-0">
          <ImageGallery
            tabTitle={tab.title}
            images={tab.images}
            slug={slug}
            imagesType={tab.imagesType}
            hasImagesToLoad={tab.hasImagesToLoad}
            imageLimit={imageLimit}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
