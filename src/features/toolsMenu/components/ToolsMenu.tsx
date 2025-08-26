const menuItems = [
  {
    id: '1',
    label: 'Subscrip',
  },
  {
    id: '2',
    label: 'contact',
  },
  {
    id: '3',
    label: 'Terms&service',
  },
  {
    id: '4',
    label: 'Privacy',
  },
  {
    id: '5',
    label: 'helpW',
  },
  {
    id: '6',
    label: 'Manza Settings',
  },
  {
    id: '7',
    label: 'ManzaE',
  },
  {
    id: '8',
    label: 'Advert',
  },
  {
    id: '9',
    label: 'For Business',
  },
]

export function ToolsMenu() {
  return (
    <div className="space-y-6">
      <div className="w-full text-center font-serif text-3xl">Tools</div>

      <div className="grid w-full grid-cols-2 gap-y-4 sm:grid-cols-3">
        {menuItems.map(({ label, id }) => {
          return (
            <div
              key={id}
              className="flex cursor-pointer flex-col items-center gap-2 hover:text-secondary-blue"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-300 p-2 text-2xl text-white">
                PP
              </div>

              <div className="text-nowrap font-serif capitalize">{label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
