import { ConvexError, v } from 'convex/values'
import { getAuthenticatedUser } from './_utils'
import { mutation, query } from './_generated/server'

export const get = query({
  args: {},
  handler: async (ctx, _args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const friendships1 = await ctx.db
      .query('friends')
      .withIndex('by_user1', (q) => q.eq('user1', currentUser._id))
      .collect()

    const friendships2 = await ctx.db
      .query('friends')
      .withIndex('by_user2', (q) => q.eq('user2', currentUser._id))
      .collect()

    const friendships = [...friendships1, ...friendships2]

    const friends = await Promise.all(
      friendships.map(async (friendship) => {
        const friend = await ctx.db.get(
          friendship.user1 === currentUser._id ? friendship.user2 : friendship.user1,
        )

        if (!friend) {
          throw new ConvexError('Friend could not be found')
        }

        return friend
      }),
    )

    return friends
  },
})

export const createGroup = mutation({
  args: {
    members: v.array(v.id('users')),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const conversationId = await ctx.db.insert('conversations', {
      isGroup: true,
      name: args.name,
    })

    await Promise.all(
      [...args.members, currentUser._id].map(async (memberId) => {
        await ctx.db.insert('conversationMembers', {
          memberId,
          conversationId,
        })
      }),
    )
  },
})
