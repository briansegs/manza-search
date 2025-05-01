import { IMAGE_EXTENSIONS, RAW_EXTENSIONS, VIDEO_EXTENSIONS } from './constants'

export const getResourceType = (ext: string) => {
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video'
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image'
  if (RAW_EXTENSIONS.includes(ext)) return 'raw'
  return 'auto' // Default to auto for unknown types
}

/**
 * Sanitize a string to be used as part of a public ID
 * @param str String to sanitize
 * @returns Sanitized string
 */
export const sanitizeForPublicID = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-') // Replace any character that's not a letter or number with a hyphen
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, '') // Remove leading or trailing hyphens
}
