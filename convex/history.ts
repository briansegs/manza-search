import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const recordVisit = mutation({
  args: {
    articleId: v.string(),
  },
  handler: async (ctx, { articleId }) => {
    const user = await getAuthenticatedUser(ctx)

    if (!user) throw new ConvexError('Could not record visit entry becuase user is not logged in')

    await ctx.db.insert('history', {
      userId: (await user)._id,
      articleId,
    })
  },
})

export const removeVisit = mutation({
  args: {
    visitId: v.id('history'),
  },
  handler: async (ctx, { visitId }) => {
    const user = await getAuthenticatedUser(ctx)

    const entry = await ctx.db.get(visitId)

    if (!entry) throw new ConvexError("Entry doesn't exist")
    if (entry.userId !== user._id) throw new ConvexError('unauthorized')

    await ctx.db.delete(entry._id)
  },
})

export const removeAllVisits = mutation({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx)

    const entries = await ctx.db
      .query('history')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .collect()

    if (entries) {
      await Promise.all(
        entries.map((entry) => {
          ctx.db.delete(entry._id)
        }),
      )
    }
  },
})

export const getVisits = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx)

    return await ctx.db
      .query('history')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .order('desc')
      .take(100)
  },
})
