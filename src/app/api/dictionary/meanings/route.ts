import handleError from '@/lib/handlers/error'
import { ValidationError } from '@/lib/http-error'
import { DictAnswerSchema } from '@/lib/validations'
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

export type SuccessResponse<T = null> = ActionResponse<T> & { success: true }
export type ErrorResponse = ActionResponse<undefined> & { success: false }

export type APIErrorResponse = NextResponse<ErrorResponse>
export type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>

export async function POST(req: Request) {
  const { word } = await req.json()

  try {
    const validatedData = DictAnswerSchema.safeParse({ word })

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors)
    }

    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch definition for word: ${word}`)
    }

    console.log('server: ', validatedData)
    const data = await res.json()

    return NextResponse.json({ success: true, data: data }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
