import { internalMutation } from './_generated/server'

export const cleanupPinned = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000

    const pins = await ctx.db.query('pinnedContent').collect()

    for (const pin of pins) {
      if (now - pin._creationTime > oneDay) {
        await ctx.db.delete(pin._id)
      }
    }
  },
})
