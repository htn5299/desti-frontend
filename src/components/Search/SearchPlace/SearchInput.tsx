import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useLazySearchPlacesQuery } from '../../../redux/api/placesApi'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/store'
import { toggleSearch } from '../../../redux/features/appSlice'
import { Place } from '../../../utils/types'
import useDebounce from '../../../hooks/useDebounce'
import { SearchItem } from './index'

const SearchInput = () => {
  const dispatch = useAppDispatch()
  const [listPlace, setListPlace] = useState<Place[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [trigger, result] = useLazySearchPlacesQuery()
  const navigate = useNavigate()
  const myData = useDebounce(searchText, 100)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`search?q=${searchText}`)
    dispatch(toggleSearch())
  }
  useEffect(() => {
    if (myData) {
      trigger(myData)
    }
  }, [myData, trigger])

  useEffect(() => {
    if (result.data) {
      setListPlace(result.data)
    }
    return () => {
      setListPlace([])
    }
  }, [result])

  const rendered = listPlace.map((place) => (
    <div key={place.id}>
      <SearchItem place={place} />
    </div>
  ))

  return (
    <div className={' w-full '}>
      {/*<form className='flex  items-center' onSubmit={handleSubmit}>*/}
      <form className='flex items-center justify-center bg-gray-500' onSubmit={handleSubmit}>
        {/*<label className='sr-only'>Search</label>*/}
        {/*<div className='relative w-full'>*/}
        {/*  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>*/}
        {/*    <MapPinIcon className={'h-6 w-6 text-gray-500'} />*/}
        {/*  </div>*/}
        {/*  <input*/}
        {/*    type='text'*/}
        {/*    className='block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500*/}
        {/*   focus:ring-blue-500   dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'*/}
        {/*    placeholder='Search place name...'*/}
        {/*    required*/}
        {/*    onChange={(e) => setSearchText(e.target.value)}*/}
        {/*    value={searchText}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className='mx-auto flex w-full  items-center rounded-t-lg  bg-white '>
          <div className='w-full'>
            <input
              type='search'
              className='w-full rounded-full px-4 py-1 text-gray-800 focus:outline-none'
              x-model='search'
              placeholder='Search Desti'
              required
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
          <div>
            <button
              type='submit'
              className='flex h-12 w-12 items-center justify-center rounded-r-lg bg-blue-500 text-white'
            >
              <MagnifyingGlassIcon className={'h-4 w-4'} />
              <span className='sr-only'>Search</span>
            </button>
          </div>
        </div>
      </form>
      {rendered}
    </div>
  )
}

export default SearchInput
