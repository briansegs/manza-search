interface ErrorMessage {
  fetch: string
  required: string
}

export const errorMessage: ErrorMessage = {
  fetch: 'Failed to fetch definitions. Please check your spelling.',
  required: 'Please enter a word with at least 2 characters.',
}
