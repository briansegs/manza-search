const tableItems = [
  'list 1',
  'Books',
  'List 3',
  'Fun Facts',
  'IMG',
  'list 6',
  'Audio',
  'Shop',
  'list 7',
]
export default function TableOfContent() {
  return (
    <div className="flex w-full items-center justify-center bg-slate-100 px-12 py-6 sm:w-[480px] md:w-full">
      <div className="flex items-center gap-10">
        <p className="cursor-pointer font-serif text-xl hover:text-navBar">Shop</p>

        <div className="flex flex-col items-center border-2 border-black">
          <div className="text-nowrap bg-black px-6 py-[2px] font-serif text-white underline underline-offset-2">
            Table of Content
          </div>

          <ul className="h-52 w-full list-inside list-disc overflow-y-auto p-2 font-serif text-lg">
            {tableItems.map((item, index) => (
              <li key={index} className="cursor-pointer hover:text-navBar">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
