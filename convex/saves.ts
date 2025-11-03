import { query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const getSaved = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx)

    return await ctx.db
      .query('savedContent')
      .withIndex('by_user', (q) => q.eq('userId', currentUser._id))
      .collect()
  },
})
