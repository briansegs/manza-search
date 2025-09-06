import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleImagesLinkProps } from './types'

export function ArticleImagesLink({ slug }: ArticleImagesLinkProps) {
  return (
    <Button className="text-blue-500" variant="link" asChild>
      <Link href={`${slug}/images`}>View More</Link>
    </Button>
  )
}
