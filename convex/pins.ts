import { query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const getPinned = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx)

    return await ctx.db
      .query('pinnedContent')
      .withIndex('by_user', (q) => q.eq('userId', currentUser._id))
      .collect()
  },
})
