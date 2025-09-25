'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { ReaderMenuButton } from '@/features/bookReader/components/ReaderMenuButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Book } from '@/payload-types'
import { BookPDF } from './BookPDF'
import { pdf } from '@react-pdf/renderer'

export type ReaderDownloadButtonProps = { book: Book }

export function ReaderDownloadButton({ book }: ReaderDownloadButtonProps) {
  const { title, id } = book
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)

      const blob = await pdf(<BookPDF book={book} />).toBlob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = title ? `${title}.pdf` : `Book-${id}.pdf`
      link.click()

      URL.revokeObjectURL(url)
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
