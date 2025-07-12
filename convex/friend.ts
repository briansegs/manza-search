import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'
import { getAuthenticatedUser, getConversationByConversationId } from './_utils'

export const remove = mutation({
  args: {
    conversationId: v.id('conversations'),
  },
  handler: async (ctx, args) => {
    await getAuthenticatedUser(ctx)

    await getConversationByConversationId({
      ctx,
      conversationId: args.conversationId,
    })

    const memberships = await ctx.db
      .query('conversationMembers')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.conversationId))
      .collect()

    if (!memberships || memberships.length !== 2) {
      throw new ConvexError('This is not a direct conversation between two users')
    }

    const friendship = await ctx.db
      .query('friends')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.conversationId))
      .unique()

    if (!friendship) {
      throw new ConvexError('Friend could not be found')
    }

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.conversationId))
      .collect()

    await ctx.db.delete(args.conversationId)

    await ctx.db.delete(friendship._id)

    await Promise.all(
      memberships.map(async (membership) => {
        await ctx.db.delete(membership._id)
      }),
    )

    await Promise.all(
      messages.map(async (message) => {
        await ctx.db.delete(message._id)
      }),
    )
  },
})
