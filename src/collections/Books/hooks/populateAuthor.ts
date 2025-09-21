import type { CollectionAfterReadHook } from 'payload'
import { User } from 'src/payload-types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthor: CollectionAfterReadHook = async ({ doc, req, req: { payload } }) => {
  if (!doc?.content) return doc
  const rawAuthor = doc.content.author
  if (!rawAuthor) {
    doc.content.populatedAuthor = undefined
    return doc
  }

  try {
    const authorItem: Partial<User> | null = await payload.findByID({
      collection: 'users',
      id: typeof rawAuthor === 'object' ? rawAuthor.id : rawAuthor,
      depth: 0,
      overrideAccess: true,
      req,
      // Limit fields for safety
      select: { id: true, name: true, image: true },
    })

    if (authorItem) {
      const safeAuthor = {
        id: String(authorItem.id),
        name: authorItem.name ?? null,
        image: authorItem.image ?? null,
      }
      doc.content.populatedAuthor = safeAuthor
    } else {
      doc.content.populatedAuthor = undefined
    }
  } catch (error) {
    payload.logger.debug?.('populateAuthor: unable to fetch user for book', { error })
    doc.content.populatedAuthor = undefined
  }

  return doc
}
