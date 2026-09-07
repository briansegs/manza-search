import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/utilities/useDebounce'

export function useArticleSearch() {
  const [value, setValue] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasInteracted = useRef(false)

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    const initialQ = searchParams.get('q')
    if (initialQ) setValue(initialQ)
  }, [searchParams])

  useEffect(() => {
    if (!hasInteracted.current) return

    const url = `/search${debouncedValue ? `?q=${encodeURIComponent(debouncedValue)}` : ''}`
    router.push(url)
  }, [debouncedValue, router])

  const onChange = (nextValue: string) => {
    hasInteracted.current = true
    setValue(nextValue)
  }

  const onSubmit = () => {
    hasInteracted.current = true
    router.push(`/search${value ? `?q=${encodeURIComponent(value)}` : ''}`)
  }

  return { value, onChange, onSubmit }
}
