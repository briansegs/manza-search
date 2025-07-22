import { MOMenuButton } from '../../moreOptions/components/MOMenuButton'

export function CalendarButton({ ...props }) {
  return (
    <MOMenuButton className="bg-[#ffc8ce]" aria-label="Open calendar" {...props}>
      S
    </MOMenuButton>
  )
}
