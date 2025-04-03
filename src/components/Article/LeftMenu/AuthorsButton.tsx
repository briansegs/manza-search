import React, { ReactNode } from 'react'
import MenuButton from '../MenuButton'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'

interface AuthorsButtonProps {
  authors: string[]
  children: ReactNode
}

const AuthorsButton: React.FC<AuthorsButtonProps> = ({ authors, children }) => (
  <Popover>
    <PopoverTrigger asChild>
      <MenuButton>{children}</MenuButton>
    </PopoverTrigger>
    {authors && (
      <PopoverContent
        className="w-fit rounded-lg border-2 border-black bg-menu-primary py-2 font-serif text-white"
        side="right"
      >
        <ul className="flex flex-col">
          {authors.map((author, index) => (
            <li key={index}>{author}</li>
          ))}
        </ul>
      </PopoverContent>
    )}
  </Popover>
)

export default AuthorsButton
