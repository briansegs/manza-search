import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const create = mutation({
  args: {
    title: v.string(),
    start: v.string(),
    end: v.string(),
    description: v.optional(v.string()),
    allDay: v.optional(v.boolean()),
    alertTime: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    if (new Date(args.start) >= new Date(args.end)) {
      throw new ConvexError('Start time must be before end time')
    }

    const event = await ctx.db.insert('events', {
      userId: currentUser._id,
      ...args,
    })

    return event
  },
})

export const deleteEvent = mutation({
  args: { id: v.id('events') },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const event = await ctx.db.get(args.id)

    if (!event) throw new ConvexError('Event could not be found')

    if (event.userId !== currentUser._id) {
      throw new ConvexError('User not authorized to delete this event')
    }

    await ctx.db.delete(event._id)
  },
})

export const update = mutation({
  args: {
    id: v.id('events'),
    data: v.object({
      title: v.string(),
      start: v.string(),
      end: v.string(),
      description: v.optional(v.string()),
      allDay: v.optional(v.boolean()),
      alertTime: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const event = await ctx.db.get(args.id)

    if (!event) throw new ConvexError('Event could not be found')

    if (event.userId !== currentUser._id) {
      throw new ConvexError('User not authorized to update this event')
    }

    if (new Date(args.data.start) >= new Date(args.data.end)) {
      throw new ConvexError('Start time must be before end time')
    }

    await ctx.db.patch(event._id, args.data)
  },
})
