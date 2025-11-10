import { internalMutation } from './_generated/server'

export const cleanupPinned = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    const batchSize = 100

    let cursor: string | null = null
    let done = false

    while (!done) {
      const {
        page: pins,
        isDone,
        continueCursor,
      } = await ctx.db.query('pinnedContent').paginate({ cursor, numItems: batchSize })

      for (const pin of pins) {
        if (now - pin._creationTime > oneDay) {
          await ctx.db.delete(pin._id)
        }
      }

      if (isDone) {
        done = true
      } else {
        cursor = continueCursor
      }
    }
  },
})
