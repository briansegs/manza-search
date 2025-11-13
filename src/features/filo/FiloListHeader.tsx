import { FiloListHeaderProps } from './types'
import { FiloRemoveListButton } from './FiloRemoveListButton'

export function FiloListHeader({ group }: FiloListHeaderProps) {
  return (
    <div className="mb-1 flex items-center justify-center gap-4">
      <p className="text-center">{group.name}</p>

      <FiloRemoveListButton group={group} />
    </div>
  )
}
