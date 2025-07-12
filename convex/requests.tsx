import { ConvexError } from 'convex/values'
import { query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const get = query({
  args: {},
  handler: async (ctx, _args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const requests = await ctx.db
      .query('requests')
      .withIndex('by_receiver', (q) => q.eq('receiver', currentUser._id))
      .collect()

    const requestWithSender = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.sender)

        if (!sender) {
          throw new ConvexError('Request sender could not be found')
        }

        return { sender, request }
      }),
    )

    return requestWithSender
  },
})

export const count = query({
  args: {},
  handler: async (ctx, _args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const requests = await ctx.db
      .query('requests')
      .withIndex('by_receiver', (q) => q.eq('receiver', currentUser._id))
      .collect()

    return requests.length
  },
})
