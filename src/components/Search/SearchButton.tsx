import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchButton = () => {
  return (
    <div className={'flex w-full items-center justify-center gap-2 rounded bg-gray-900  py-2 text-gray-50'}>
      <MagnifyingGlassIcon className={'h-5 w-5'} />
      <p className={'text-sm'}>Search Places</p>
    </div>
  )
}

export default SearchButton
