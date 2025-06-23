import { Button } from '@/features/shared/components/ui/button'

const buttonStyles = 'bg-slate-200 hover:bg-slate-300 text-black border-2 border-black'

export default function ContentButtons() {
  return (
    <div className="flex gap-2 pr-4">
      <Button className={`${buttonStyles}`}>B</Button>
      <Button className={`${buttonStyles}`}>A</Button>
      <Button className={`${buttonStyles}`}>LM</Button>
    </div>
  )
}
