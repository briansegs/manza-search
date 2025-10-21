import { LogOut } from 'lucide-react'
import { useClerk, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

export function HeaderUserButton() {
  const { signOut } = useClerk()
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: pathname })
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  return (
    <UserButton
      appearance={{
        elements: {
          userButtonAvatarBox: 'w-8 h-8',
          userButtonPopoverActionButton__signOut: 'hidden',
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Action
          label="Sign out"
          labelIcon={<LogOut size={14} />}
          onClick={handleSignOut}
        />
      </UserButton.MenuItems>
    </UserButton>
  )
}
