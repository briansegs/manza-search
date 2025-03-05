import PageClient from './page.client'

export default async function Article() {
  return (
    <article className="pb-16 pt-16">
      <PageClient />

      <div>Article</div>
    </article>
  )
}
