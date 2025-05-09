import { Media } from '@/payload-types'
import React from 'react'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RenderMedia from '@/components/RenderMedia'

type BooksType = {
  image?: Media
  id: string
  name: string
  shop: string
  price: string
  shipping: string
}

const books: BooksType[] = [
  {
    id: '67d0ada48f59c7a439a3055d',
    name: 'The Great Gatsby',
    shop: 'Bookstore A',
    price: '$15.99',
    shipping: 'Free shipping',
  },
  {
    id: '67d0ada88f59c7a439a3055f',
    name: '1984',
    shop: 'Bookstore B',
    price: '$12.49',
    shipping: 'Standard $4.99',
  },
  {
    id: '67d0adaa8f59c7a439a30561',
    name: 'To Kill a Mockingbird',
    shop: 'Bookstore C',
    price: '$18.75',
    shipping: 'Free for orders over $20',
  },
  {
    id: '67d0adac8f59c7a439a30563',
    name: 'Moby Dick',
    shop: 'Bookstore D',
    price: '$20.00',
    shipping: 'Standard $5.99',
  },
  {
    id: '67d0adae8f59c7a439a30565',
    name: 'Pride and Prejudice',
    shop: 'Bookstore E',
    price: '$9.99',
    shipping: 'Free shipping',
  },
]

const buttonStyles =
  'size-14 rounded-full border-4 border-white bg-black text-xl text-white hover:bg-black hover:text-secondary-blue'

const Books = () => {
  return (
    <>
      {books && books.length > 0 ? (
        books.map(({ image, id, name, shop, price, shipping }) => (
          <div
            key={id}
            className="border-content h-fit overflow-hidden rounded-primary bg-primary-blue"
          >
            <div className="relative h-96 w-[300px] flex-shrink-0">
              {image ? <RenderMedia media={image} /> : <ImagePlaceholder />}
            </div>

            <div className="flex flex-col gap-2 p-2">
              <div className="mb-3 font-serif text-xl text-white">
                <div>Name: {name}</div>
                <div>
                  Shop: <span className="text-blue-300">{shop}</span>
                </div>
                <div>
                  Price: <span className="text-blue-300">{price}</span>
                </div>
                <div>
                  S&H: <span className="text-blue-300">{shipping}</span>
                </div>
              </div>

              <div className="mb-3 flex justify-center gap-4">
                <Button className={clsx(buttonStyles)}>B</Button>
                <Button className={clsx(buttonStyles)}>A</Button>
                <Button className={clsx(buttonStyles)}>LM</Button>
                <Button className={clsx(buttonStyles)}>QS</Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 text-center">No books available</div>
      )}
    </>
  )
}

export default Books
