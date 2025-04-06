'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import DefinitionContent from './DefinitionContent'
import DefinitionPlaceholder from './DefinitionPlaceholder'
import DefinitionFetching from './DefinitionFetching'
import { DictionaryEntry } from '../types'
import { errorMessage } from '@/utilities/errorMessage'

const DictionaryButton: React.FC = () => {
  const [definitions, setDefinitions] = useState<DictionaryEntry[]>([])
  const [value, setValue] = useState('')
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDefinitions([])

    if (!value || value.length <= 1) {
      setFormError(errorMessage.required)
      return
    }

    try {
      setIsFetching(true)
      const { success, error, data } = await api.dictionary.getDefinitions(value)

      if (!success) {
        setFormError(errorMessage.fetch)
        console.error(error?.message)
      } else {
        setFormError(null)
        setDefinitions(data ?? [])
      }
    } catch (error) {
      setFormError(errorMessage.fetch)
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-primary size-full bg-menu-red hover:bg-black">d</Button>
      </DialogTrigger>
      <DialogContent className="bg-menu border-4 border-black">
        <DialogHeader>
          <DialogTitle className="font-serif text-white">Dictionary</DialogTitle>
          <DialogDescription className="font-serif">
            Type a word into the search bar to discover its definition.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} className="mb-2">
            <div className="flex items-center rounded border-2 border-black bg-white">
              <Input
                min={2}
                onChange={(event) => {
                  setValue(event.target.value)
                }}
                placeholder="Search"
                className="rounded-none border-none bg-transparent font-serif text-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <button type="submit" className="">
                <SearchIcon className="mx-3 w-6 text-muted-foreground" />
              </button>
            </div>

            <div className="ml-2 h-2 text-xs text-red-400">{formError}</div>
          </form>

          <div className="h-[450px] overflow-y-auto rounded border-2 border-black bg-white p-2 font-serif text-menu-primary">
            {isFetching ? (
              <DefinitionFetching />
            ) : definitions.length > 0 ? (
              <DefinitionContent definitions={definitions} />
            ) : (
              <DefinitionPlaceholder />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DictionaryButton
