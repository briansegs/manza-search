import { LayoutDashboard } from 'lucide-react'
import { MOMenuButton } from './MOMenuButton'

export function DashboardButton({ ...props }) {
  return (
    <MOMenuButton className="bg-[#0a7ea4]" aria-label="Open dashboard" {...props}>
      <LayoutDashboard className="size-6" />
    </MOMenuButton>
  )
}
