import { LoaderCircle } from 'lucide-react'
import React from 'react'

const DefinitionFetching: React.FC = () => (
  <div className="flex h-[430px] w-full items-center justify-center">
    <LoaderCircle className="size-20 animate-spin text-muted" />
  </div>
)

export default DefinitionFetching
