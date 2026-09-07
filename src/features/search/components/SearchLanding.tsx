'use client'
import React from 'react'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/Logo/Logo'
import { useArticleSearch } from '../hooks/useArticleSearch'

export function SearchLanding() {
  const { value, onChange, onSubmit } = useArticleSearch()

  return (
    <div className="flex flex-col items-center gap-6 px-4 pt-16">
      <Logo src="/manzaSearch-logo.png" loading="eager" priority="high" className="h-24" />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex h-14 w-full max-w-xl items-center rounded-full border border-border bg-background px-4 shadow-sm"
      >
        <Label htmlFor="search-landing" className="sr-only">
          Search articles
        </Label>
        <Input
          id="search-landing"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search articles on Manza Search"
          className="border-none bg-transparent text-lg text-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
        <SearchIcon className="ml-3 w-6 shrink-0 text-muted-foreground" />
      </form>
    </div>
  )
}
