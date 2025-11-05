import { SectionOptions } from '@/stores/filoStore'
import { cn } from '@/utilities/ui'

export type FiloMenuProps = {
  disabled?: boolean
  handleOpen?: (section: SectionOptions) => void
  filoSections: readonly SectionOptions[]
}

export function FiloMenu({ disabled = false, handleOpen, filoSections }: FiloMenuProps) {
  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        disabled={disabled}
        onClick={() => (handleOpen ? handleOpen('pin') : {})}
        className="font-serif text-xl hover:text-secondary-blue focus:outline-none"
      >
        Menu
      </button>

      <ul className="list-inside list-disc space-y-1 font-serif text-xl">
        {filoSections.map((section) => (
          <li key={section}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => (handleOpen ? handleOpen(section) : {})}
              className={cn(
                'cursor-pointer hover:text-secondary-blue focus:outline-none',
                'capitalize',
              )}
            >
              {section}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
