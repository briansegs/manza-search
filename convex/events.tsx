import { query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const get = query({
  args: {},
  handler: async (ctx, _args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const events = await ctx.db
      .query('events')
      .withIndex('by_userId', (q) => q.eq('userId', currentUser._id))
      .collect()

    return events
  },
})
