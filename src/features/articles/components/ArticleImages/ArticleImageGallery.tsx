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

export function ArticleImageGallery({ externalImages, internalImages }: ArticleImageGalleryProps) {
  const [activeTab, setActiveTab] = useState<TabValue>('outside-link')

  const tabTitles: Record<TabValue, string> = {
    'outside-link': 'On Links',
    'manza-database': 'On Manza Database',
  }

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
      <div className="ml-0 flex flex-col items-center gap-0 sm:ml-12 sm:flex-row sm:gap-4">
        <div className="w-[200px] text-center font-serif text-2xl text-white sm:text-right">
          {tabTitles[activeTab]}
        </div>
        <ImageGalleryTabsList className="gap-2">
          <ImageGalleryTabsTrigger value="outside-link">Links</ImageGalleryTabsTrigger>
          <ImageGalleryTabsTrigger value="manza-database">MDB</ImageGalleryTabsTrigger>
        </ImageGalleryTabsList>
      </div>

      <TabsContent value="outside-link" className="mt-0">
        <ImageGallery tabTitle="Links" images={externalImages} />
      </TabsContent>

      <TabsContent value="manza-database" className="mt-0">
        <ImageGallery tabTitle="Manza Database" images={internalImages} />
      </TabsContent>
    </Tabs>
  )
}
