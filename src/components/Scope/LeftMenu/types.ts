interface Category {
  id: string
  title: string
  slug?: string | null | undefined
}

export interface LeftMenuProps {
  categories: Category[]
}

export interface LeftMenuContainerProps {
  categories: Category[]
}
