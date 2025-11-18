import { internalMutation } from './_generated/server'

export const cleanupPinned = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    const cutoff = now - oneDay
    const batchSize = 100

    console.log('Running cleanupPinned...')

    let cursor: string | null = null
    let deleted = 0

    try {
      while (true) {
        const {
          page: pins,
          isDone,
          continueCursor,
        } = await ctx.db
          .query('pinnedContent')
          .withIndex('by_creationTime', (q) => q.lt('_creationTime', cutoff))
          .paginate({ cursor, numItems: batchSize })

        for (const pin of pins) {
          try {
            await ctx.db.delete(pin._id)
            deleted++
          } catch (pinErr) {
            console.error(
              `cleanupPinned: failed to delete pinned item ${pin._id}:`,
              pinErr instanceof Error ? pinErr.message : pinErr,
            )
          }
        }

        if (isDone) break
        cursor = continueCursor
      }

      console.log(`cleanupPinned complete — deleted ${deleted} items`)
      return { deleted }
    } catch (err) {
      console.error(
        'cleanupPinned: fatal error during cleanup — aborting cron run:',
        err instanceof Error ? err.message : err,
      )
      throw err
    }
  },
})
