'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Book } from '@/payload-types'

export type ReaderDownloadButtonProps = { book: Book }

export function ReaderDownloadButton({ book }: ReaderDownloadButtonProps) {
  const { title, id } = book
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)
      const [{ BookPDF }, { pdf }] = await Promise.all([
        import('./BookPDF'),
        import('@react-pdf/renderer'),
      ])

      const blob = await pdf(<BookPDF book={book} />).toBlob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      const base = title ? title : `Book-${id}`
      const sanitized = base.replace(/[\\/:*?"<>|]/g, '').trim() || 'Book'
      link.download = `${sanitized}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => URL.revokeObjectURL(url), 0)
    } catch (err) {
      console.error('Failed to generate PDF:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ReaderMenuButton
          type="button"
          aria-label="Download book"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : (
            <Download aria-hidden="true" />
          )}
        </ReaderMenuButton>
      </TooltipTrigger>
      <TooltipContent>{loading ? 'Generating PDF…' : 'Download Book'}</TooltipContent>
    </Tooltip>
  )
}
