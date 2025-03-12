import { Media } from '@/payload-types'
import React from 'react'
import { renderMedia, renderPlaceholder } from '../../components'
import { Button } from '@/components/ui/button'

type booksType = {
  image: Media
  id: string
  name: string
  shop: string
  price: string
  shipping: string
}

const books: booksType[] = [
  {
    image: {
      alt: 'post 3',
      filename: 'image-post2.webp',
      mimeType: 'image/webp',
      filesize: 22332,
      width: 1920,
      height: 1080,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-07T15:02:33.969Z',
      updatedAt: '2025-03-07T15:02:33.969Z',
      id: '67cb0a89120502787d4d8360',
      url: '/api/media/file/image-post2.webp',
      thumbnailURL: '/api/media/file/image-post2-300x169.webp',
    },
    id: '67d0ada48f59c7a439a3055d',
    name: 'The Great Gatsby',
    shop: 'Bookstore A',
    price: '$15.99',
    shipping: 'Free shipping',
  },
  {
    image: {
      alt: 'Blue wave',
      filename: 'blue-waves-1.webp',
      mimeType: 'image/webp',
      filesize: 6352,
      width: 548,
      height: 353,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-06T16:10:30.375Z',
      updatedAt: '2025-03-06T16:10:30.375Z',
      id: '67c9c8f679a0e42420f9611a',
      url: '/api/media/file/blue-waves-1.webp',
      thumbnailURL: '/api/media/file/blue-waves-1-300x193.webp',
    },
    id: '67d0ada88f59c7a439a3055f',
    name: '1984',
    shop: 'Bookstore B',
    price: '$12.49',
    shipping: 'Standard $4.99',
  },
  {
    image: {
      alt: 'post 3',
      filename: 'image-post2.webp',
      mimeType: 'image/webp',
      filesize: 22332,
      width: 1920,
      height: 1080,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-07T15:02:33.969Z',
      updatedAt: '2025-03-07T15:02:33.969Z',
      id: '67cb0a89120502787d4d8360',
      url: '/api/media/file/image-post2.webp',
      thumbnailURL: '/api/media/file/image-post2-300x169.webp',
    },
    id: '67d0adaa8f59c7a439a30561',
    name: 'To Kill a Mockingbird',
    shop: 'Bookstore C',
    price: '$18.75',
    shipping: 'Free for orders over $20',
  },
  {
    image: {
      alt: 'Blue wave',
      filename: 'blue-waves-1.webp',
      mimeType: 'image/webp',
      filesize: 6352,
      width: 548,
      height: 353,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-06T16:10:30.375Z',
      updatedAt: '2025-03-06T16:10:30.375Z',
      id: '67c9c8f679a0e42420f9611a',
      url: '/api/media/file/blue-waves-1.webp',
      thumbnailURL: '/api/media/file/blue-waves-1-300x193.webp',
    },
    id: '67d0adac8f59c7a439a30563',
    name: 'Moby Dick',
    shop: 'Bookstore D',
    price: '$20.00',
    shipping: 'Standard $5.99',
  },
  {
    image: {
      alt: 'post 3',
      filename: 'image-post2.webp',
      mimeType: 'image/webp',
      filesize: 22332,
      width: 1920,
      height: 1080,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-07T15:02:33.969Z',
      updatedAt: '2025-03-07T15:02:33.969Z',
      id: '67cb0a89120502787d4d8360',
      url: '/api/media/file/image-post2.webp',
      thumbnailURL: '/api/media/file/image-post2-300x169.webp',
    },
    id: '67d0adae8f59c7a439a30565',
    name: 'Pride and Prejudice',
    shop: 'Bookstore E',
    price: '$9.99',
    shipping: 'Free shipping',
  },
]

const Books = () => {
  return (
    <>
      {books &&
        books.map(({ image, id, name, shop, price, shipping }) => (
          <div key={id} className="border-content h-fit rounded-lg bg-header">
            <div className="relative h-96 w-[300px] flex-shrink-0 overflow-hidden">
              {image ? renderMedia(image) : renderPlaceholder()}
            </div>

            <div className="flex flex-col gap-2 p-2">
              <div className="mb-3 font-serif text-xl text-white">
                <div>
                  Name: <span className="text-blue-300">{name}</span>
                </div>
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

              <div className="flex justify-center gap-4">
                <Button className="size-14 rounded-full border-4 border-white bg-black text-xl text-white">
                  B
                </Button>
                <Button className="size-14 rounded-full border-4 border-white bg-black text-xl text-white">
                  A
                </Button>
                <Button className="size-14 rounded-full border-4 border-white bg-black text-base text-white">
                  LM
                </Button>
              </div>
              <div className="mb-3">
                <Button className="size-14 rounded-full border-4 border-white bg-black text-base text-white">
                  QS
                </Button>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default Books
