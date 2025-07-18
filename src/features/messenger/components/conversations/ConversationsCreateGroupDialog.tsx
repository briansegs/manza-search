'use client'

import { api } from '../../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { z } from 'zod'
import { useMutationState } from '../../hooks/useMutationState'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { CirclePlus, X } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

const createGroupFormSchema = z.object({
  name: z.string().min(1, { message: "This field can't be empty" }),
  members: z.string().array().min(1, { message: 'You must select at least 1 friend' }),
})

export function ConversationsCreateGroupDialog() {
  const friends = useQuery(api.friends.get)

  const { mutate: createGroup, pending } = useMutationState(api.friends.createGroup)

  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: '',
      members: [],
    },
  })

  const members = form.watch('members', [])

  const unselectedFriends = useMemo(() => {
    return friends ? friends.filter((friend) => !members.includes(friend._id)) : []
  }, [members, friends])

  const handleSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
    await createGroup({
      name: values.name,
      members: values.members,
    })
      .then(() => {
        form.reset()
        toast.success('Group created!')
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      })
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <DialogTrigger asChild>
              <CirclePlus />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Create Group</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="block">
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>Add your friends to get started!</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Group name..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="members"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>Friends</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={unselectedFriends.length === 0}>
                          <Button className="w-full" variant="outline">
                            Select
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-full">
                          {unselectedFriends.map((friend) => {
                            return (
                              <DropdownMenuCheckboxItem
                                key={friend._id}
                                className="flex w-full items-center gap-2 p-2"
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    form.setValue('members', [...members, friend._id])
                                  }
                                }}
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={friend.imageUrl} />

                                  <AvatarFallback>{getUserInitial(friend)}</AvatarFallback>
                                </Avatar>

                                <h4 className="truncate">{getUserDisplayName(friend)}</h4>
                              </DropdownMenuCheckboxItem>
                            )
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {members?.length ? (
              <Card className="no-scrollbar flex h-24 w-full items-center gap-3 overflow-x-auto p-2">
                {friends
                  ?.filter((friend) => members.includes(friend._id))
                  .map((friend) => {
                    return (
                      <div key={friend._id} className="flex flex-col items-center gap-1">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={friend.imageUrl} />

                            <AvatarFallback>{getUserInitial(friend)}</AvatarFallback>
                          </Avatar>

                          <X
                            className="absolute bottom-8 left-7 h-4 w-4 cursor-pointer rounded-full bg-muted text-muted-foreground"
                            onClick={() => {
                              form.setValue(
                                'members',
                                members.filter((id) => id !== friend._id),
                              )
                            }}
                          />
                        </div>

                        <p className="truncate text-sm">{getUserShortName(friend)}</p>
                      </div>
                    )
                  })}
              </Card>
            ) : null}

            <DialogFooter>
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

const getUserDisplayName = (friend: { username?: string; email: string }) => {
  return friend.username || friend.email
}

const getUserInitial = (friend: { username?: string; email: string }) => {
  return friend.username ? friend.username.substring(0, 1) : friend.email.substring(0, 1)
}

const getUserShortName = (friend: { username?: string; email: string }) => {
  return friend.username ? friend.username.split(' ')[0] : friend.email.split('@')[0]
}
