import { Bot } from 'lucide-react'
import { MOMenuButton } from '../../moreOptions/components/MOMenuButton'

export function MistralButton({ ...props }) {
  return (
    <MOMenuButton className="bg-[#fa520f]" aria-label="Open Mistral chat" {...props}>
      <Bot className="size-6" />
    </MOMenuButton>
  )
}
