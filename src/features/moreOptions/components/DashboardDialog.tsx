import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DashboardButton } from './DashboardButton'
import { cn } from '@/utilities/ui'

export function DashboardDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DashboardButton />
      </DialogTrigger>

      <DialogTitle className="sr-only">Dashboard</DialogTitle>
      <DialogDescription className="sr-only">Dashboard dialog content</DialogDescription>

      <DialogContent
        aria-description="Dashboard dialog content"
        className={cn(
          'sm:px-6 md:h-[90%] md:max-w-[80%]',
          'h-full max-w-full px-0',
          'border-black bg-menu',
        )}
        closeButtonStyles="text-white"
      >
        dashboard
      </DialogContent>
    </Dialog>
  )
}
