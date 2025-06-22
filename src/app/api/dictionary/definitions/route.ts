import { APIErrorResponse } from '@/types/global'
import handleError from '@/lib/handlers/error'
import { ValidationError } from '@/lib/http-error'
import { DictAnswerSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'

import { isError } from '@/utilities/isError'
import { DictionaryEntry } from '@/features/dictionary/types'

const path = process.env.DICTIONARY_API

export async function POST(req: Request) {
  const { word } = await req.json()

  try {
    const validatedData = DictAnswerSchema.safeParse({ word })

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors)
    }

    // Timeout for external API call
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(`${path}${word}`, {
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      throw new Error(`Failed to fetch definition for word: ${word}`)
    }

    const data: DictionaryEntry[] = await res.json()

    return NextResponse.json({ success: true, data: data }, { status: 200 })
  } catch (err) {
    const error = isError(err) ? err : new Error('Unknown error')
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: { message: 'Dictionary API request timed out.' } },
        { status: 408 },
      )
    }
    return handleError(error, 'api') as APIErrorResponse
  }
}
