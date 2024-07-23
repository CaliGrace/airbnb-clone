'use client'
import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <Image
    className='hidden md:block'
    src='/images/logo.png' 
    width={100}
    height={100}
    alt='airbnb-logo'
    />
  )
}

export default Logo