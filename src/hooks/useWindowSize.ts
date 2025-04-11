import { useSyncExternalStore } from 'react'

const listeners: Set<() => void> = new Set()
let size = { width: 0, height: 0 }

function getSnapshot() {
  return size
}

function getServerSnapshot() {
  return { width: 0, height: 0 }
}

// Throttle resize handling (~60fps = every ~16ms)
let timeout: ReturnType<typeof setTimeout> | null = null
function onResize() {
  if (timeout) return
  timeout = setTimeout(() => {
    timeout = null
    size = { width: window.innerWidth, height: window.innerHeight }
    listeners.forEach((listener) => listener())
  }, 100) // You can tweak the delay
}

function subscribe(callback: () => void) {
  if (listeners.size === 0) {
    window.addEventListener('resize', onResize)
  }

  listeners.add(callback)

  return () => {
    listeners.delete(callback)
    if (listeners.size === 0) {
      window.removeEventListener('resize', onResize)
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
    }
  }
}

export default function useWindowSize() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
