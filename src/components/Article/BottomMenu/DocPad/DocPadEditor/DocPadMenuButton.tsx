import React from 'react'

const DocPadMenuButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => (
  <button
    {...props}
    className="rounded border-[1px] border-white bg-menu px-2 py-1 text-sm hover:border-black hover:bg-black hover:text-muted"
  />
)

export default DocPadMenuButton
