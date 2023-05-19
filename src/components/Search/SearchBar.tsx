import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/search?q=${search}`)
  }
  return (
    <form className='w-48 md:w-64 lg:w-80' onSubmit={handleSubmit}>
      <div className='relative'>
        <MagnifyingGlassIcon className='absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-500 ' />
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='search place'
          className='w-full rounded-full bg-gray-100 py-2 pl-12  pr-4 placeholder-gray-500 outline-none focus:bg-gray-200 '
        />
      </div>
    </form>
  )
}
