import { internalMutation } from './_generated/server'

export const cleanupHistory = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    const cutoff = now - oneDay
    const batchSize = 100

    console.log('Running cleanupHistory...')

    let cursor: string | null = null
    let deleted = 0

    try {
      while (true) {
        const {
          page: entries,
          isDone,
          continueCursor,
        } = await ctx.db
          .query('history')
          .withIndex('by_visitedAt', (q) => q.lt('visitedAt', cutoff))
          .paginate({ cursor, numItems: batchSize })

        for (const entry of entries) {
          try {
            await ctx.db.delete(entry._id)
            deleted++
          } catch (entryErr) {
            // Log the error but continue with the next entry
            console.error(
              `cleanupHistory: failed to delete history entry ${entry._id}:`,
              entryErr instanceof Error ? entryErr.message : entryErr,
            )
          }
        }

        if (isDone) break
        cursor = continueCursor
      }

      console.log(`cleanupHistory complete — deleted ${deleted} entries`)
      return { deleted }
    } catch (err) {
      // Log a clear error message and rethrow so Convex marks the cron run as failed
      console.error(
        'cleanupHistory: fatal error during cleanup — aborting cron run:',
        err instanceof Error ? err.message : err,
      )
      throw err
    }
  },
})
