import { internalMutation, internalQuery, mutation } from './_generated/server'
import { ConvexError, v } from 'convex/values'
import { getUserByClerkId } from './_utils'

export const createUser = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique()

    if (existing) throw new Error('User already exists')

    await ctx.db.insert('users', args)
  },
})

export const getUser = internalQuery({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
      .unique()

    if (!user) {
      console.error(`User not found with ClerkId: ${clerkId}`)
      return null
    }

    return user
  },
})

export const deleteUserInternal = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
      .unique()

    if (!user) throw new Error(`User not found with ClerkId: ${clerkId}`)

    await ctx.db.delete(user._id)
  },
})

export const deleteUser = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    // Check auth before updating
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthorized')
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    })

    if (!currentUser) {
      throw new ConvexError('User not found')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
      .unique()

    if (!user) throw new Error(`User not found with ClerkId: ${clerkId}`)

    await ctx.db.delete(user._id)
  },
})

export const updateUserInternal = internalMutation({
  args: {
    clerkId: v.string(),
    data: v.object({
      username: v.optional(v.string()),
      email: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { clerkId, data }) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
      .unique()

    if (!user) throw new Error(`User not found with ClerkId: ${clerkId}`)

    await ctx.db.patch(user._id, data)
  },
})

export const updateUser = mutation({
  args: {
    clerkId: v.string(),
    data: v.object({
      username: v.optional(v.string()),
      email: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { clerkId, data }) => {
    // Check auth before updating
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthorized')
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    })

    if (!currentUser) {
      throw new ConvexError('User not found')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
      .unique()

    if (!user) throw new Error(`User not found with ClerkId: ${clerkId}`)

    await ctx.db.patch(user._id, data)
  },
})
