import { DictionaryEntry } from '@/features/dictionary/types'
import { fetchHandler } from './handlers/fetch'
import { ActionResponse } from '@/types/global'

export const api = {
  dictionary: {
    getDefinitions: (word: string): Promise<ActionResponse<DictionaryEntry[]>> =>
      fetchHandler(`/api/dictionary/definitions`, {
        method: 'POST',
        body: JSON.stringify({ word }),
      }),
  },
}
