import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Id } from 'convex/_generated/dataModel'
import { Check, User, X } from 'lucide-react'
import { useMutationState } from '../hooks/useMutationState'
import { api } from '../../../../convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

type FriendRequestProps = {
  id: Id<'requests'>
  imageUrl: string
  username: string
  email: string
}

export function FriendRequest({ id, imageUrl, username, email }: FriendRequestProps) {
  const { mutate: denyRequest, pending: denyPending } = useMutationState(api.request.deny)

  const { mutate: acceptRequest, pending: acceptPending } = useMutationState(api.request.accept)

  return (
    <Card className="flex w-full flex-row items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>

          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          onClick={() => {
            acceptRequest({ id })
              .then(() => {
                toast.success('Friend request accepted')
              })
              .catch((error) => {
                toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
              })
          }}
          disabled={acceptPending || denyPending}
        >
          <Check />
        </Button>

        <Button
          size="icon"
          onClick={() => {
            denyRequest({ id })
              .then(() => {
                toast.success('Friend request denied')
              })
              .catch((error) => {
                toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
              })
          }}
          disabled={denyPending || acceptPending}
          variant="destructive"
        >
          <X />
        </Button>
      </div>
    </Card>
  )
}
