'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type DateTimePickerProps = {
  value?: Date
  onChange: (newDate: Date) => void
}

export default function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return
    const updated = new Date(newDate)
    updated.setHours(value?.getHours() ?? 0)
    updated.setMinutes(value?.getMinutes() ?? 0)
    updated.setSeconds(value?.getSeconds() ?? 0)
    onChange(updated)
    setOpen(false)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes, seconds] = e.target.value.split(':').map(Number)
    const updated = new Date(value ?? new Date())
    updated.setHours(hours || 0)
    updated.setMinutes(minutes || 0)
    updated.setSeconds(seconds || 0)
    onChange(updated)
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1 text-sm font-normal text-muted-foreground">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date" className="w-32 justify-between font-normal">
              {value ? value.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              defaultMonth={value}
              captionLayout="dropdown"
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time" className="px-1 text-sm font-normal text-muted-foreground">
          Time
        </Label>
        <Input
          type="time"
          id="time"
          step="1"
          value={value ? value.toTimeString().slice(0, 8) : ''}
          onChange={handleTimeChange}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
