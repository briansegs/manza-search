import { Card } from '@/features/shared/components/ui/card'

export function ChatFallback() {
  return (
    <Card className="hidden h-full w-full items-center justify-center bg-secondary p-2 text-secondary-foreground lg:flex">
      Select/start a conversation to get started!
    </Card>
  )
}
