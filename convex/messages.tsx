import { ConvexError, v } from 'convex/values'
import { query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const get = query({
  args: {
    id: v.id('conversations'),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const membership = await ctx.db
      .query('conversationMembers')
      .withIndex('by_memberId_conversationId', (q) =>
        q.eq('memberId', currentUser._id).eq('conversationId', args.id),
      )
      .unique()

    if (!membership) {
      throw new ConvexError("You aren't a member of this conversation")
    }

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.id))
      .order('desc')
      .collect()

    const messagesWithSender = await Promise.all(
      messages.map(async (message) => {
        const messageSender = await ctx.db.get(message.senderId)

        if (!messageSender) {
          throw new ConvexError('Could not find sender of message')
        }

        return {
          message,
          senderImage: messageSender.imageUrl,
          senderName: messageSender.username ? messageSender.username : messageSender.email,
          isCurrentUser: messageSender._id === currentUser._id,
        }
      }),
    )

    return messagesWithSender
  },
})
