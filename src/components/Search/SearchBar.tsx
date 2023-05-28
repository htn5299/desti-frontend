import { Place } from '../../utils/types'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchPlacesQuery } from '../../redux/api/placesApi'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import { SearchItem } from 'components'

export default function SearchBar() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Place[]>([])
  const debounceSearch = useDebounce(searchTerm, 500)
  const { data: placesSearch, isFetching } = useSearchPlacesQuery(`${debounceSearch}`, {
    skip: !Boolean(debounceSearch)
  })
  useEffect(() => {
    if (debounceSearch && placesSearch) {
      setResults(placesSearch)
    } else {
      setResults([])
    }
  }, [debounceSearch, placesSearch])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchTerm) {
      return
    }
    navigate(`/search?q=${searchTerm}`, {
      state: results
    })
  }

  const renderedSearch = results?.map((placeSearch) => {
    return <SearchItem key={placeSearch.id} place={placeSearch} />
  })
  return (
    <div className={'mx-auto w-5/6'}>
      <form onSubmit={handleSubmit}>
        <div className='relative'>
          <MagnifyingGlassIcon className='absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-500 ' />
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='search place'
            className='w-full rounded-full bg-gray-200 py-2 pl-12  pr-4 placeholder-gray-500 outline-none focus:bg-gray-200 '
          />
        </div>
      </form>
      <div className={'mt-2'}>
        {isFetching && <div>...loading</div>}
        {!isFetching && renderedSearch}
      </div>
    </div>
  )
}
