'use client'
import React, { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDebounce } from '@/utilities/useDebounce'
import type { WebSearchResponse } from '../types'

export function WebSearchResults({ initialQuery }: { initialQuery: string }) {
  const [value, setValue] = useState(initialQuery)
  const debouncedValue = useDebounce(value)

  const [data, setData] = useState<WebSearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!debouncedValue) {
      setData(null)
      return
    }

    const controller = new AbortController()

    setIsLoading(true)
    fetch(`/api/web-search?q=${encodeURIComponent(debouncedValue)}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((json: WebSearchResponse) => setData(json))
      .catch((error) => {
        if (error.name !== 'AbortError') setData(null)
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [debouncedValue])

  return (
    <div className="container space-y-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex h-12 w-full max-w-2xl items-center rounded-full border border-border bg-background px-4"
      >
        <Label htmlFor="web-search" className="sr-only">
          Search the web
        </Label>
        <Input
          id="web-search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search the web"
          className="border-none bg-transparent text-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
        <SearchIcon className="ml-3 w-5 shrink-0 text-muted-foreground" />
      </form>

      {isLoading && <p className="text-muted-foreground">Searching the web...</p>}

      {data && (
        <Tabs defaultValue="web" className="mx-auto max-w-2xl">
          <TabsList>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <div className="mt-4 rounded-2xl border border-border bg-background p-4 shadow-sm">
            <TabsContent value="web" className="space-y-4">
              {data.web.map((result) => (
                <a
                  key={result.url}
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-border p-4 hover:bg-muted"
                >
                  <p className="text-sm text-muted-foreground">{result.hostname}</p>
                  <p className="font-medium text-primary">{result.title}</p>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </a>
              ))}
            </TabsContent>

            <TabsContent value="images" className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {data.images.length === 0 && <p className="text-muted-foreground">No results found.</p>}
              {data.images.map((result) => (
                <a
                  key={result.url}
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg border border-border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    className="aspect-square w-full object-cover"
                  />
                </a>
              ))}
            </TabsContent>

            <TabsContent value="videos" className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {data.videos.length === 0 && <p className="text-muted-foreground">No results found.</p>}
              {data.videos.map((result) => (
                <a
                  key={result.url}
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg border border-border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.image}
                    alt={result.title}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium text-primary">{result.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {result.publisher} - {result.duration}
                    </p>
                  </div>
                </a>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  )
}
