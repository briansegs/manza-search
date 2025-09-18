import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleBooksLinkProps } from './types'

export function ArticleBooksLink({ slug }: ArticleBooksLinkProps) {
  return (
    <Button className="text-blue-500" variant="link" asChild>
      <Link href={`/articles/${slug}/books`}>View More</Link>
    </Button>
  )
}
