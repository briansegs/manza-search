import { ConvexError } from 'convex/values'
import { MutationCtx, QueryCtx } from './_generated/server'
import { Id } from './_generated/dataModel'

type getUserByClerkIdProps = {
  ctx: QueryCtx | MutationCtx
  clerkId: string
}

type getConversationByConversationIdProps = {
  ctx: QueryCtx | MutationCtx
  conversationId: Id<'conversations'>
}

export async function getUserByClerkId({ ctx, clerkId }: getUserByClerkIdProps) {
  return await ctx.db
    .query('users')
    .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
    .unique()
}

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity()

  if (!identity) {
    throw new ConvexError('Unauthorized')
  }

  const currentUser = await getUserByClerkId({
    ctx,
    clerkId: identity.subject,
  })

  if (!currentUser) {
    throw new ConvexError('User not found')
  }

  return currentUser
}

export async function getConversationByConversationId({
  ctx,
  conversationId,
}: getConversationByConversationIdProps) {
  const conversation = await ctx.db.get(conversationId)

  if (!conversation) {
    throw new ConvexError('Conversation not found')
  }

  return conversation
}
