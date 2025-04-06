import { DictionaryEntry } from '@/components/Article/RightMenuContainer/types'
import { APIErrorResponse } from '@/types/global'
import handleError from '@/lib/handlers/error'
import { ValidationError } from '@/lib/http-error'
import { DictAnswerSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'

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

    const data: DictionaryEntry[] = await res.json()

    return NextResponse.json({ success: true, data: data }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
