import { Download } from 'lucide-react'
import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Book } from '@/payload-types'

export type ReaderDownloadButtonProps = Pick<Book, 'id' | 'title'>

export function ReaderDownloadButton({ id, title }: ReaderDownloadButtonProps) {
  const handleDownload = async () => {
    const res = await fetch(`/api/books/${id}/download`)
    if (!res.ok) return alert('Failed to download book')

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = title ? `${title}.pdf` : `Book-${id}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ReaderMenuButton onClick={handleDownload} type="button" aria-label="Download book">
          <Download aria-hidden="true" />
        </ReaderMenuButton>
      </TooltipTrigger>

      <TooltipContent>Download Book</TooltipContent>
    </Tooltip>
  )
}
