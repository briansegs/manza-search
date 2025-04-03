import { Article } from '@/payload-types'

interface GetAuthorListProps {
  populatedAuthors: Article['populatedAuthors']
  externalAuthors: Article['externalAuthors']
}

/**
 * Merges populated authors array and external authors array.
 * @param populatedAuthors
 * @param externalAuthors
 * @returns An array of author's names(string).
 */
export default function getAuthorList({
  populatedAuthors,
  externalAuthors,
}: GetAuthorListProps): string[] {
  const authorNames = populatedAuthors?.map(({ name }) => name ?? '') ?? []
  return [...authorNames, ...(externalAuthors ?? [])]
}
