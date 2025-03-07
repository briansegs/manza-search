import MissingImage from '@/components/ImageMissing'
import { Media } from '@/components/Media'
import { Article } from '@/payload-types'
import React from 'react'

export const ArticleHero: React.FC<{ article: Article }> = ({ article }) => {
  const { heroImage } = article

  return (
    <div className="w-full p-2">
      <div className="flex justify-between gap-2 border-4 border-black px-2 py-8">
        <div className="flex w-full items-center justify-center bg-slate-100">
          <div className="flex items-center gap-6">
            <p>Menu</p>

            <ul className="list-inside list-disc">
              <li>Pin</li>
              <li>Save</li>
              <li>History</li>
              <li>Lists</li>
            </ul>
          </div>
        </div>

        <div className="flex w-full items-center justify-center bg-slate-100">
          <div className="flex items-center gap-6">
            <p>Shop</p>

            <ul className="list-inside list-disc">
              <li>table of Content</li>
              <li>list 1</li>
              <li>Books</li>
              <li>List 3</li>
              <li>Fun Fact</li>
              <li>IMG</li>
              <li>list 6</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-100 p-12">
          <div className="h-48 w-96 overflow-hidden">
            {heroImage && typeof heroImage !== 'string' ? (
              <Media imgClassName="size-full object-cover" resource={heroImage} />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-1 border-2 border-neutral-500 bg-card">
                <MissingImage />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
