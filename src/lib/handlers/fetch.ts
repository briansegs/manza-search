import { ActionResponse } from '@/types/global'
import { RequestError } from '../http-error'
import logger from '../logger'
import handleError from './error'
import { isError } from '@/utilities/isError'

interface FetchOptions extends RequestInit {
  timeout?: number
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {},
): Promise<ActionResponse<T>> {
  const { timeout = 5000, headers: customHeaders = {}, ...restOptions } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders }
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  }

  try {
    const response = await fetch(url, config)

    clearTimeout(id)

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new RequestError(415, 'Response is not JSON')
    }

    return await response.json()
  } catch (err) {
    const error = isError(err) ? err : new Error('Unknown error')

    if (error.name === 'AbortError') {
      logger.warn(`Request to ${url} timed out`)
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`)
    }

    return handleError(error) as ActionResponse<T>
  }
}
