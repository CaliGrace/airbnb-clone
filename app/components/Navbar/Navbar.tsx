"use client"

import React from 'react'
import Container from '../Container'
import Logo from '../Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { User } from '@prisma/client'
import Categories from './Categories'

interface NavbarProps {
  currentUser?: User | null
}
const Navbar: React.FC<NavbarProps> = ({currentUser}) => {

  return (
    <div className='fixed bg-white shadow-sm w-full z-10'>
      <div className="py-3 border-b-[1px]" >
        <Container>
          <div className="flex gap-3 justify-between items-center">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <div className="shadow-md">

        <Categories />
      </div>
    </div>
  )
}

export default Navbar