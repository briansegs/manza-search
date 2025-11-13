'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useListsActions } from '@/stores/listsStore'
import { ListsButtonAuthenticatedProps } from './types'
import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { useMutationState } from '@/hooks/useMutationState'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

export function ListsButtonAuthenticated({
  content,
  contentType,
  children,
}: ListsButtonAuthenticatedProps) {
  const { setOpen, setContentId, setContentType } = useListsActions()

  const { mutate: addToList, pending: addPending } = useMutationState(api.list.addToList)

  const lists = useQuery(api.lists.getLists)

  function handleNewList() {
    setOpen(true)
    setContentId(content.id)
    setContentType(contentType)
  }

  async function handleAddToList({ list }: { list: { name: string; _id: string } }) {
    try {
      await addToList({ listId: list._id, contentId: content.id, contentType })
      toast.success(`${contentType} added to list (${list.name})`)
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem className="flex justify-center">
          <Button className="w-full" onClick={handleNewList}>
            New
          </Button>
        </DropdownMenuItem>

        {lists?.map((list) => {
          return (
            <DropdownMenuItem key={list._id} className="flex w-full justify-center">
              <button disabled={addPending} onClick={() => handleAddToList({ list: list })}>
                {list.name}
              </button>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
