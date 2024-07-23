"use client"
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div className='w-full md:w-auto rounded-full border px-6 py-2 gap-2 flex justify-between items-center'>
        <div className="hidden sm:block px-3 py-1 hover:bg-slate-100 font-semibold transition rounded-full cursor-pointer">Anywhere</div>
        <div className="px-3 py-1  font-semibold hover:bg-slate-100 transition rounded-full cursor-pointer">Any Week</div>
        <div className="px-3 py-1 hover:bg-slate-100 transition rounded-full cursor-pointer flex gap-2 items-center">
            <div className="hidden sm:block font-semibold ">Add Guests</div>
            <div className="bg-rose-700 text-white p-2 rounded-full">
                <BiSearch size={18}/>
            </div>
        </div>
    </div>
  )
}

export default Search