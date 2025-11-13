import { v } from 'convex/values'
import { query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const getLists = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx)

    return await ctx.db
      .query('contentLists')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .collect()
  },
})

export const getListedContent = query({
  args: {
    listId: v.id('contentLists'),
  },
  handler: async (ctx, { listId }) => {
    const user = await getAuthenticatedUser(ctx)

    return await ctx.db
      .query('listedContent')
      .withIndex('by_list', (q) => q.eq('listId', listId))
      .filter((q) => q.eq(q.field('userId'), user._id))
      .collect()
  },
})

export const getListsWithContent = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx)

    const lists = await ctx.db
      .query('contentLists')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .collect()

    const results = await Promise.all(
      lists.map(async (list) => {
        const items = await ctx.db
          .query('listedContent')
          .withIndex('by_list', (q) => q.eq('listId', list._id))
          .filter((q) => q.eq(q.field('userId'), user._id))
          .collect()

        return { ...list, items: items }
      }),
    )

    return results
  },
})
