import { useSyncExternalStore } from 'react'

function useWindowSize() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback)
      return () => window.removeEventListener('resize', callback)
    },
    () => ({ width: window.innerWidth, height: window.innerHeight }),
  )
}

export default useWindowSize
