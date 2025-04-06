import { NextResponse } from 'next/server'

export type ActionResponse<T = null> = {
  success: boolean
  data?: T
  error?: {
    message: string
    details?: Record<string, string[]>
  }
  status?: number
}

export type ErrorResponse = ActionResponse<undefined> & { success: false }

export type APIErrorResponse = NextResponse<ErrorResponse>
