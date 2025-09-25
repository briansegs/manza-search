import { Chapter } from '@/payload-types'

export function getBookPages(chapters: (string | Chapter)[]) {
  return (
    chapters?.flatMap((chapter) => {
      if (chapter && typeof chapter === 'object' && Array.isArray(chapter.content)) {
        return chapter.content
      }
      return []
    }) ?? []
  )
}
