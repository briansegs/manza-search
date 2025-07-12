'use client'

import { Card } from '@/components/ui/card'
import { z } from 'zod'
import { activeConversationStateType } from '../MessengerLayout'
import { api } from '../../../../../convex/_generated/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutationState } from '../../hooks/useMutationState'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
// import { useRef } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import TextAreaAutosize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be empty",
  }),
})

type ChatInputProps = Pick<activeConversationStateType, 'activeConversation'>

export function ChatInput({ activeConversation: conversationId }: ChatInputProps) {
  const { mutate: createMessage, pending } = useMutationState(api.message.create)

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: '',
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target

    if (selectionStart !== null) {
      form.setValue('content', value)
    }
  }

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: 'text',
      content: [values.content],
    })
      .then(() => {
        form.reset()
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      })
  }

  return (
    <Card className="relative w-full rounded-lg p-2">
      <div className="flex w-full items-end gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full items-end gap-2">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem className="h-full w-full">
                    <FormControl>
                      <TextAreaAutosize
                        onKeyDown={async (e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            await form.handleSubmit(handleSubmit)()
                          }
                        }}
                        rows={1}
                        maxRows={3}
                        {...field}
                        onChange={handleInputChange}
                        onClick={handleInputChange}
                        placeholder="Type a message..."
                        className="min-h-full w-full resize-none border-0 bg-card p-1.5 text-card-foreground outline-0 placeholder:text-muted-foreground"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button disabled={pending} size="icon" type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  )
}
