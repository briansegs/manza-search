export const TitleBar = ({ title }: { title: string | null | undefined }) => (
  <div className="border-content w-full bg-header pl-10">
    <p className="font-serif text-lg text-white">{title || ''}</p>
  </div>
)
