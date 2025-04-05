'use client'

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'

const DictionaryButton: React.FC = () => {
  const [meanings, setMeanings] = useState('Meaning...')
  const [value, setValue] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await api.dictionary.getMeaning(value)
    console.log('client: ', data)
    const meaning = data[0].meanings[0].definitions[0].definition
    setMeanings(meaning)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-menu-red hover:bg-black">d</Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-[10px]">
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center rounded border-2 border-border"
          >
            <Input
              onChange={(event) => {
                setValue(event.target.value)
              }}
              placeholder="Search"
              className="rounded-none border-none bg-transparent text-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <button type="submit" className="">
              <SearchIcon className="mx-3 w-6 text-muted-foreground" />
            </button>
          </form>
          <div>{meanings}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DictionaryButton
