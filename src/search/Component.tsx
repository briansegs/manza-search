'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import React, { useState, useEffect } from 'react'
// import { useDebounce } from '@/utilities/useDebounce'
// import { useRouter } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

export const Search: React.FC = () => {
  // const [value, setValue] = useState('')
  // const router = useRouter()

  // const debouncedValue = useDebounce(value)

  // useEffect(() => {
  //   router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  // }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="flex h-8 items-center rounded border border-border bg-background"
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          // onChange={(event) => {
          //   setValue(event.target.value)
          // }}
          placeholder="Search"
          className="rounded-none border-none bg-transparent text-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
        <SearchIcon className="mx-3 w-6 text-muted-foreground" />
      </form>
    </div>
  )
}
