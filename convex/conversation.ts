import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAuthenticatedUser, getConversationByConversationId } from './_utils'

export const get = query({
  args: {
    id: v.id('conversations'),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const conversation = await ctx.db.get(args.id)

    if (!conversation) {
      return null
    }

    const membership = await ctx.db
      .query('conversationMembers')
      .withIndex('by_memberId_conversationId', (q) =>
        q.eq('memberId', currentUser._id).eq('conversationId', conversation._id),
      )
      .unique()

    if (!membership) {
      throw new ConvexError("You aren't a member of this conversation")
    }

    const allConversationMemberships = await ctx.db
      .query('conversationMembers')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.id))
      .collect()

    if (!conversation.isGroup) {
      const otherMembership = allConversationMemberships.find(
        (membership) => membership.memberId !== currentUser._id,
      )

      if (!otherMembership) {
        throw new ConvexError('Other member not found in conversation')
      }

      const otherMemberDetails = await ctx.db.get(otherMembership.memberId)

      if (!otherMemberDetails) {
        throw new ConvexError('Other member details not found')
      }

      return {
        ...conversation,
        otherMember: {
          ...otherMemberDetails,
          lastSeenMessageId: otherMembership.lastSeenMessage,
        },
        otherMembers: null,
      }
    } else {
      const otherMembers = await Promise.all(
        allConversationMemberships
          .filter((membership) => membership.memberId !== currentUser._id)
          .map(async (membership) => {
            const member = await ctx.db.get(membership.memberId)

            if (!member) {
              throw new ConvexError('Member could not be found')
            }

            return {
              _id: member._id,
              username: member.username,
            }
          }),
      )

      return {
        ...conversation,
        otherMembers,
        otherMember: null,
      }
    }
  },
})

export const deleteGroup = mutation({
  args: {
    conversationId: v.id('conversations'),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    await getConversationByConversationId({
      ctx,
      conversationId: args.conversationId,
    })

    const memberships = await ctx.db
      .query('conversationMembers')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.conversationId))
      .collect()

    if (!memberships || memberships.length <= 1) {
      throw new ConvexError('No members found for this conversation')
    }

    const currentUserMembership = memberships.find(
      (membership) => membership.memberId === currentUser._id,
    )

    if (!currentUserMembership) {
      throw new ConvexError('You are not a member of this group')
    }

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.conversationId))
      .collect()

    await ctx.db.delete(args.conversationId)

    await Promise.all(
      memberships.map(async (membership) => {
        await ctx.db.delete(membership._id)
      }),
    )

    await Promise.all(
      messages.map(async (message) => {
        await ctx.db.delete(message._id)
      }),
    )
  },
})

export const leaveGroup = mutation({
  args: {
    conversationId: v.id('conversations'),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const conversation = await getConversationByConversationId({
      ctx,
      conversationId: args.conversationId,
    })

    const membership = await ctx.db
      .query('conversationMembers')
      .withIndex('by_memberId_conversationId', (q) =>
        q.eq('memberId', currentUser._id).eq('conversationId', args.conversationId),
      )
      .unique()

    if (!membership) {
      throw new ConvexError('You are not a member of this group')
    }

    const allMemberships = await ctx.db
      .query('conversationMembers')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.conversationId))
      .collect()

    if (allMemberships.length <= 1) {
      const messages = await ctx.db
        .query('messages')
        .withIndex('by_conversationId', (q) => q.eq('conversationId', args.conversationId))
        .collect()

      await Promise.all(
        messages.map(async (message) => {
          await ctx.db.delete(message._id)
        }),
      )

      await ctx.db.delete(membership._id)
      await ctx.db.delete(conversation._id)
    } else {
      await ctx.db.delete(membership._id)
    }
  },
})

export const markRead = mutation({
  args: {
    conversationId: v.id('conversations'),
    messageId: v.id('messages'),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const membership = await ctx.db
      .query('conversationMembers')
      .withIndex('by_memberId_conversationId', (q) =>
        q.eq('memberId', currentUser._id).eq('conversationId', args.conversationId),
      )
      .unique()

    if (!membership) {
      throw new ConvexError('You are not a member of this group')
    }

    const lastMessage = await ctx.db.get(args.messageId)

    await ctx.db.patch(membership._id, {
      lastSeenMessage: lastMessage ? lastMessage._id : undefined,
    })
  },
})
