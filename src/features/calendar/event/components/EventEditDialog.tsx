'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useMutationState } from '@/features/messenger/hooks/useMutationState'
import { api } from '../../../../../convex/_generated/api'

import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import DateTimePicker from '@/features/calendar/components/DateTimePicker'
import { Textarea } from '@/components/ui/textarea'
import { EventEditDialogProps } from '../types'
import { useEffect } from 'react'

const eventSchema = z.object({
  title: z.string().min(1, { message: "This field can't be empty" }),
  description: z.optional(z.string()),
  start: z.string(),
  end: z.string(),
  allDay: z.boolean(),
  alertTime: z.optional(z.string()),
})

export function EventEditDialog({
  editDialogOpen,
  setEditDialogOpen,
  selectedEvent,
  setEventDialogOpen,
}: EventEditDialogProps) {
  const { mutate: updateEvent, pending } = useMutationState(api.event.update)

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      start: '',
      end: '',
      allDay: false,
      alertTime: '',
    },
  })

  useEffect(() => {
    if (selectedEvent?.title) {
      form.reset({
        title: selectedEvent?.title || '',
        description: selectedEvent?.description || '',
        start: selectedEvent?.start?.toISOString() || '',
        end: selectedEvent?.end?.toISOString() || '',
        allDay: selectedEvent?.allDay || false,
        alertTime: selectedEvent?.alertTime || '',
      })
    }
  }, [selectedEvent, form])

  async function handleSubmit(values: z.infer<typeof eventSchema>) {
    await updateEvent({
      id: selectedEvent._id,
      data: {
        title: values.title,
        description: values.description,
        start: values.start,
        end: values.end,
        allDay: values.allDay,
        alertTime: values.alertTime,
      },
    })
      .then(() => {
        toast.success('Event updated!')
        setEditDialogOpen(false)
        setEventDialogOpen(false)
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      })
  }

  return (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogTrigger asChild>
        <div id="Event-Edit-Dialog-trigger" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium">Edit event</DialogTitle>
          <DialogDescription className="font-medium">
            Edit the details of {selectedEvent?.title}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="allDay"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel>All day</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="start"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Start</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(val) => field.onChange(val.toISOString())}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>End</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(val) => field.onChange(val.toISOString())}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  form.reset()
                  setEditDialogOpen(false)
                }}
                variant="outline"
                disabled={pending}
              >
                Cancel
              </Button>

              <Button disabled={pending} type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
