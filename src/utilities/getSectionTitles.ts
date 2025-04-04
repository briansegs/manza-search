import { Article } from '@/payload-types'

export interface sectionTitle {
  id?: string | null
  title?: string | null
}
/**
 * Gets the ids and titles from a layout.
 * @param layout
 * @returns An array of objects with id(string) and title(string).
 */
export default function getSectionTitles({
  layout,
}: {
  layout: Article['layout']
}): sectionTitle[] {
  return layout?.map(({ id, title }) => ({ id, title })) ?? []
}
