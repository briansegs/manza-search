'use client'

import { useState, useEffect } from 'react'

/**
 * A hook for localStorage that is safe for SSR and includes error handling.
 * @param key - The key in localStorage.
 * @param initialValue - The initial value if the key is not found.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Determine if we are running on the client
  const isClient = typeof window !== 'undefined'

  // Lazily initialize the stored value state on the client.
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when storedValue changes.
  useEffect(() => {
    if (isClient) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    }
  }, [key, storedValue, isClient])

  // Setter function accepting a value or updater function.
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Remove the key from localStorage and reset state.
  const remove = () => {
    if (isClient) {
      try {
        window.localStorage.removeItem(key)
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error)
      }
    }
    setStoredValue(initialValue)
  }

  return [storedValue, setValue, remove] as const
}
