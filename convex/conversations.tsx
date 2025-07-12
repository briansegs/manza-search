import { ConvexError } from 'convex/values'
import { getAuthenticatedUser } from './_utils'
import { query, QueryCtx, MutationCtx } from './_generated/server'
import { Id } from './_generated/dataModel'

export const get = query({
  args: {},
  handler: async (ctx, _args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const conversationMemberships = await ctx.db
      .query('conversationMembers')
      .withIndex('by_memberId', (q) => q.eq('memberId', currentUser._id))
      .collect()

    const conversations = await Promise.all(
      conversationMemberships?.map(async (membership) => {
        const conversation = await ctx.db.get(membership.conversationId)

        if (!conversation) {
          throw new ConvexError('Conversation could not be found')
        }

        return conversation
      }),
    )

    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conversation, index) => {
        const allConversationMemberships = await ctx.db
          .query('conversationMembers')
          .withIndex('by_conversationId', (q) => q.eq('conversationId', conversation?._id))
          .collect()

        const lastMessage = await getLastMessageDetails({ ctx, id: conversation.lastMessageId })

        const lastSeenMessage = conversationMemberships[index]?.lastSeenMessage
          ? await ctx.db.get(conversationMemberships[index].lastSeenMessage!)
          : null

        const lastSeenMessageTime = lastSeenMessage ? lastSeenMessage._creationTime : -1

        const unseenMessages = await ctx.db
          .query('messages')
          .withIndex('by_conversationId', (q) => q.eq('conversationId', conversation._id))
          .filter((q) => q.gt(q.field('_creationTime'), lastSeenMessageTime))
          .filter((q) => q.neq(q.field('senderId'), currentUser._id))
          .collect()

        if (conversation.isGroup) {
          return { conversation, lastMessage, unseenCount: unseenMessages.length }
        } else {
          const otherMembership = allConversationMemberships.find(
            (membership) => membership.memberId !== currentUser._id,
          )

          if (!otherMembership) {
            throw new ConvexError('Other membership could not be found')
          }

          const otherMember = await ctx.db.get(otherMembership.memberId)

          if (!otherMember) {
            throw new ConvexError('Other member could not be found')
          }

          return {
            conversation,
            otherMember,
            lastMessage,
            unseenCount: unseenMessages.length,
          }
        }
      }),
    )

    return conversationsWithDetails
  },
})

const getLastMessageDetails = async ({
  ctx,
  id,
}: {
  ctx: QueryCtx | MutationCtx
  id: Id<'messages'> | undefined
}) => {
  if (!id) return null

  const message = await ctx.db.get(id)

  if (!message) return null

  const sender = await ctx.db.get(message.senderId)

  if (!sender) return null

  const content = getMessageContent(message.type, message.content as unknown as string)

  return {
    content,
    sender: sender.username ? sender.username.split(' ')[0] : sender.email.split('@')[0],
  }
}

const getMessageContent = (type: string, content: string) => {
  switch (type) {
    case 'text':
      return content
    default:
      return '[Non-text]'
  }
}
