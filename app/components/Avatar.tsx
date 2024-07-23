"use client"
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  src?: string | null
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image 
    className='w-8 h-8 rounded-full'
    src={src || "/images/avatar-image.jpg"}
    alt='user avatar'
    width={500}
    height={500}
    />
  )
}

export default Avatar