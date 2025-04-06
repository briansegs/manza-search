import { DictionaryEntry } from '@/components/Article/RightMenuContainer/types'
import { fetchHandler } from './handlers/fetch'
import { ActionResponse } from '@/types/global'

export const api = {
  dictionary: {
    getDefinitions: (word: string): Promise<ActionResponse<DictionaryEntry[]>> =>
      fetchHandler(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dictionary/definitions`, {
        method: 'POST',
        body: JSON.stringify({ word }),
      }),
  },
}
