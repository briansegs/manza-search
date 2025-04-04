'use client'
import React from 'react'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const CustomRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<{ label: string }>()

  const labelText = data?.label
    ? `Verified Source ${rowNumber !== undefined ? rowNumber + 1 : ''}: ${data.label}`
    : `Verified Source ${rowNumber !== undefined ? rowNumber + 1 : '(no name yet)'}`

  return <div>{labelText}</div>
}
