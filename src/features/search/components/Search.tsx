'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { SearchIcon } from 'lucide-react'
import { useArticleSearch } from '../hooks/useArticleSearch'

export function Search() {
  const { value, onChange, onSubmit } = useArticleSearch()

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex h-8 items-center rounded border border-border bg-background"
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
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
