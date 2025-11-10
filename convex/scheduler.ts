import { internal } from './_generated/api'
import { cronJobs } from 'convex/server'

const crons = cronJobs()

// Run cleanupPinned once every 24 hours
crons.daily(
  'cleanupPinnedDaily',
  { hourUTC: 0, minuteUTC: 0 }, // runs every day at midnight UTC
  internal.cleanupPinned.cleanupPinned,
)

export default crons
