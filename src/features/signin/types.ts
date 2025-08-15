import { ButtonHTMLAttributes } from 'react'

export type SigninButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  ref?: React.Ref<HTMLButtonElement>
}
