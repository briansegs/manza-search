import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { api } from '../../../../../convex/_generated/api'

import { z } from 'zod'
import { useMutationState } from '@/features/messenger/hooks/useMutationState'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DateTimePicker from '@/features/calendar/components/DateTimePicker'
import { Switch } from '@/components/ui/switch'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { SlotDialogProps } from '../types'

const eventSchema = z.object({
  title: z.string().min(1, { message: "This field can't be empty" }),
  description: z.optional(z.string()),
  start: z.string(),
  end: z.string(),
  allDay: z.boolean(),
})

export function SlotDialog({ slotDialogOpen, setSlotDialogOpen, selectedSlot }: SlotDialogProps) {
  const { mutate: createEvent, pending } = useMutationState(api.event.create)

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      start: '',
      end: '',
      allDay: false,
    },
  })

  useEffect(() => {
    if (selectedSlot?.start && selectedSlot?.end) {
      form.reset({
        title: '',
        description: '',
        start: selectedSlot?.start?.toISOString(),
        end: selectedSlot?.end?.toISOString(),
        allDay: false,
      })
    }
  }, [selectedSlot, form])

  const handleSubmit = async (values: z.infer<typeof eventSchema>) => {
    await createEvent({
      title: values.title,
      description: values.description,
      start: values.start,
      end: values.end,
      allDay: values.allDay,
      alertTime: values.start,
    })
      .then(() => {
        form.reset()
        toast.success('Event created!')
        setSlotDialogOpen(false)
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      })
  }

  return (
    <Dialog open={slotDialogOpen} onOpenChange={setSlotDialogOpen}>
      <DialogTrigger asChild>
        <div id="popover-trigger" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium">Create event</DialogTitle>
          <DialogDescription className="font-medium">
            Add a new event to the calendar
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
                  setSlotDialogOpen(false)
                }}
                variant="outline"
                disabled={pending}
              >
                Cancel
              </Button>

              <Button disabled={pending} type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
