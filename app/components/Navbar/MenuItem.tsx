"use client"

import React from 'react'

interface MenuItemProps {
    label: String,
    onClick: () => void
}
const MenuItem: React.FC<MenuItemProps> = ({label, onClick}) => {
  return (
    <div className="w-full py-2 cursor-pointer hover:bg-slate-100 transition px-2 text-sm" onClick={onClick}>{label}</div>
  )
}

export default MenuItem