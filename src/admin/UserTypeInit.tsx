'use client'

import { useEffect } from 'react'

function UserTypeInit() {
  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search)
      const userType = qs.get('user-type') || localStorage.getItem('user-type') || ''

      if (userType) {
        document.documentElement.setAttribute('data-user-type', userType)
        localStorage.setItem('user-type', userType)
      }
    } catch (e) {
      console.error('UserTypeInit error', e)
    }
  }, [])

  return null
}

export default UserTypeInit
