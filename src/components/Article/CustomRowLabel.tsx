'use client'
import React from 'react'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const CustomRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<{ label: string }>()

  const sourceNumber = rowNumber !== undefined ? rowNumber + 1 : ''
  const labelText = `Verified Source ${sourceNumber}: ${data?.label || '(no name yet)'}`

  return <div>{labelText}</div>
}
