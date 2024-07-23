"use client"
import React from 'react'

interface HeadingProps {
    title: string;
    center?: boolean;
    subtitle?: string;
}
const Heading: React.FC<HeadingProps> = ({title, center, subtitle}) => {
  return (
    <div className={`${center ? 'text-center' : 'text-start'}`}>
      <p className={`${center ? 'text-center' : 'text-start' } font-bold text-xl`}>{title}</p>
      <p className={`${center ? 'text-center' : 'text-start' } font-light text-sm`}>{subtitle}</p>
    </div>
  )
}

export default Heading