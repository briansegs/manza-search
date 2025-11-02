import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const saveContent = mutation({
  args: {
    contentId: v.string(),
    contentType: v.string(),
  },
  handler: async (ctx, { contentId, contentType }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const exists = await ctx.db
      .query('savedContent')
      .withIndex('by_user_content', (q) =>
        q.eq('userId', currentUser._id).eq('contentId', contentId),
      )
      .unique()

    if (exists) {
      throw new ConvexError(`${contentType} already saved`)
    }

    if (!exists) {
      await ctx.db.insert('savedContent', {
        userId: currentUser._id,
        contentId,
        contentType,
      })
    }
  },
})

export const unsaveContent = mutation({
  args: {
    contentId: v.string(),
  },
  handler: async (ctx, { contentId }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const saved = await ctx.db
      .query('savedContent')
      .withIndex('by_user_content', (q) =>
        q.eq('userId', currentUser._id).eq('contentId', contentId),
      )
      .unique()

    if (!saved) {
      throw new ConvexError("Content doesn't exist")
    }

    if (saved) await ctx.db.delete(saved._id)
  },
})

export const getSaved = query({
  args: {
    contentId: v.string(),
  },
  handler: async (ctx, { contentId }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    return await ctx.db
      .query('savedContent')
      .withIndex('by_user_content', (q) =>
        q.eq('userId', currentUser._id).eq('contentId', contentId),
      )
      .unique()
  },
})
