import React from 'react'
import PageClient from './page.client'

export default async function Page() {
  return (
    <div className="pb-24 pt-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none dark:prose-invert">
          <h1>Articles</h1>
        </div>
      </div>

      <div className="container">
        <ol className="flex flex-col gap-4">
          <li>Article 1</li>
          <li>Article 2</li>
          <li>Article 3</li>
          <li>Article 4</li>
          <li>Article 5</li>
        </ol>
      </div>
    </div>
  )
}
