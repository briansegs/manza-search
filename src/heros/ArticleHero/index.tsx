import MissingImage from '@/components/ImageMissing'
import { Media } from '@/components/Media'
import { Article } from '@/payload-types'
import React from 'react'
import TableOfContent from './TableOfContent'

export const ArticleHero: React.FC<{ article: Article }> = ({ article }) => {
  const { heroImage, layout } = article

  return (
    <div className="w-full p-2">
      <div className="border-content border-4">
        <div className="mx-auto flex w-3/4 justify-center rounded-b-[10px] bg-black md:w-1/2 xl:w-1/3">
          <h2 className="py-2 font-serif text-xl uppercase text-white">Scope Section</h2>
        </div>

        <div className="flex flex-wrap-reverse justify-center gap-2 px-2 pb-4 lg:pb-8 xl:flex-nowrap xl:justify-between">
          <div className="flex w-full flex-col items-center gap-2 md:flex-row md:items-stretch">
            <div className="flex w-full items-center justify-center bg-slate-100 px-12 py-6 sm:w-[480px] md:w-full">
              <div className="flex items-center gap-6">
                <p className="cursor-pointer font-serif text-xl hover:text-navBar">Menu</p>

                <ul className="list-inside list-disc font-serif text-lg">
                  <li className="cursor-pointer hover:text-navBar">Pin</li>
                  <li className="cursor-pointer hover:text-navBar">Save</li>
                  <li className="cursor-pointer hover:text-navBar">History</li>
                  <li className="cursor-pointer hover:text-navBar">Lists</li>
                </ul>
              </div>
            </div>

            <TableOfContent layout={layout} />
          </div>

          <div className="flex w-full items-center justify-center bg-slate-100 px-4 py-6 sm:w-fit sm:px-12">
            <div className="relative h-64 w-96 overflow-hidden shadow-[10px_10px_10px_black]">
              {heroImage && typeof heroImage !== 'string' ? (
                <Media imgClassName="size-full object-cover" resource={heroImage} fill />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-1 border-2 border-neutral-500 bg-card">
                  <MissingImage />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
