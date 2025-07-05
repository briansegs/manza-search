import { MutationCtx, QueryCtx } from './_generated/server'

type getUserByClerkIdProps = {
  ctx: QueryCtx | MutationCtx
  clerkId: string
}

export async function getUserByClerkId({ ctx, clerkId }: getUserByClerkIdProps) {
  return await ctx.db
    .query('users')
    .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
    .unique()
}
