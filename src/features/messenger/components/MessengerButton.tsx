import { MOMenuButton } from '../../moreOptions/components/MOMenuButton'

export function MessengerButton({ ...props }) {
  return (
    <MOMenuButton className="bg-[#ff1c00]" aria-label="Open messenger" {...props}>
      M
    </MOMenuButton>
  )
}
