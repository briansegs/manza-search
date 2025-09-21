import type { CollectionAfterReadHook } from 'payload'
import { User } from 'src/payload-types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthor: CollectionAfterReadHook = async ({ doc, req, req: { payload } }) => {
  if (doc?.content?.author) {
    const author = doc.content.author

    let authorDoc: User | undefined = undefined

    const authorItem = await payload.findByID({
      id: typeof author === 'object' ? author?.id : author,
      collection: 'users',
      depth: 1,
      req,
    })

    if (authorItem) {
      authorDoc = authorItem
    }

    doc.content.populatedAuthor = authorDoc
  }

  return doc
}
