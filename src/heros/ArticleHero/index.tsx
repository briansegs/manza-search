import MissingImage from '@/components/ImageMissing'
import { Media } from '@/components/Media'
import { Article } from '@/payload-types'
import React from 'react'

export const ArticleHero: React.FC<{ article: Article }> = ({ article }) => {
  const { heroImage } = article

  return (
    <div className="mb-8 w-full p-2">
      <div className="flex flex-wrap justify-center gap-2 border-4 border-black px-2 py-4 lg:py-8 xl:flex-nowrap xl:justify-between">
        <div className="flex w-full flex-col items-center gap-2 md:flex-row md:items-stretch">
          <div className="flex w-full items-center justify-center bg-slate-100 px-12 py-6 sm:w-[480px] md:w-full">
            <div className="flex items-center gap-6">
              <p className="cursor-pointer font-serif text-xl hover:text-navBar">Menu</p>

              <ul className="list-inside list-disc">
                <li className="cursor-pointer hover:text-navBar">Pin</li>
                <li className="cursor-pointer hover:text-navBar">Save</li>
                <li className="cursor-pointer hover:text-navBar">History</li>
                <li className="cursor-pointer hover:text-navBar">Lists</li>
              </ul>
            </div>
          </div>

          <div className="flex w-full items-center justify-center bg-slate-100 px-12 py-6 sm:w-[480px] md:w-full">
            <div className="flex items-center gap-6">
              <p className="cursor-pointer font-serif text-xl hover:text-navBar">Shop</p>

              <div className="flex flex-col items-center border-2 border-black">
                <div className="text-nowrap bg-black px-6 py-[2px] font-serif text-white underline underline-offset-2">
                  Table of Content
                </div>

                <ul className="h-48 w-full list-inside list-disc overflow-y-auto p-2">
                  <li className="cursor-pointer hover:text-navBar">list 1</li>
                  <li className="cursor-pointer hover:text-navBar">Books</li>
                  <li className="cursor-pointer hover:text-navBar">List 3</li>
                  <li className="cursor-pointer hover:text-navBar">Fun Fact</li>
                  <li className="cursor-pointer hover:text-navBar">IMG</li>
                  <li className="cursor-pointer hover:text-navBar">list 6</li>

                  <li className="cursor-pointer hover:text-navBar">Fun Fact</li>
                  <li className="cursor-pointer hover:text-navBar">IMG</li>
                  <li className="cursor-pointer hover:text-navBar">list 6</li>
                </ul>
              </div>
            </div>
          </div>
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
  )
}
