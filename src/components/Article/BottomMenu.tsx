import React from 'react'

const BottomMenu = () => {
  return (
    <div className="bg-menu-primary fixed bottom-0 z-10 flex h-14 w-full justify-between">
      <div className="bg-menu-red w-28"></div>
      <div className="flex items-center justify-between">
        <div className="rounded-[8px] border-2 border-white bg-black px-2 py-[1px] text-white">
          Doc Pad
        </div>
      </div>
      <div className="w-28 bg-blue-500"></div>
    </div>
  )
}

export default BottomMenu
