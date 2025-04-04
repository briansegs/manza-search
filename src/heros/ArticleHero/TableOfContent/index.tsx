import ScrollToSection from '@/components/Article/ScrollToSection'
import { Article } from '@/payload-types'
import getSectionTitles from '@/utilities/getSectionTitles'

interface TableOfContentProps {
  layout: Article['layout']
}

const TableOfContent: React.FC<TableOfContentProps> = ({ layout }) => {
  const sectionTitles = getSectionTitles({ layout })

  return (
    <div className="flex w-full items-center justify-center bg-slate-100 px-12 py-6 sm:w-[480px] md:w-full">
      <div className="flex items-center gap-10">
        <p className="cursor-pointer font-serif text-xl hover:text-navBar">Shop</p>

        <div className="flex max-w-44 flex-col items-center border-2 border-black">
          <div className="w-full text-nowrap bg-black px-6 py-[2px] text-center font-serif text-white underline underline-offset-2">
            Table of Content
          </div>

          <ul className="h-52 w-full list-outside list-disc overflow-y-auto p-2 pl-7 font-serif text-lg">
            {sectionTitles.map(({ id, title }) => (
              <li key={id} className="max-w-full cursor-pointer hover:text-navBar">
                <ScrollToSection id={id ?? ''}>{title}</ScrollToSection>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TableOfContent
