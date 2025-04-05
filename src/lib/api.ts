import { ActionResponse, fetchHandler } from './handlers/fetch'

export const api = {
  dictionary: {
    getMeaning: (word: string): Promise<ActionResponse<string>> =>
      fetchHandler(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dictionary/meanings`, {
        method: 'POST',
        body: JSON.stringify({ word }),
      }),
  },
}
