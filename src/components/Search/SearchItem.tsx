import React from 'react'
import { Link } from 'react-router-dom'
import { Place } from '../../utils/types'
import { useAppDispatch } from '../../redux/store'
import { toggleSearch } from '../../redux/features/appSlice'

interface PropsState {
  place: Place
}

const SearchItem = (props: PropsState) => {
  const dispatch = useAppDispatch()
  const { place } = props

  return (
    <div className={'rounded-md px-3 py-1 hover:bg-gray-300'} onClick={() => dispatch(toggleSearch())}>
      <Link to={`/places/${[place.id]}`} className={' cursor-pointer '}>
        <p className={'line-clamp-1 font-semibold'}>{place.name}</p>
        <p className={'line-clamp-1'}>{place.description}</p>
      </Link>
    </div>
  )
}

export default SearchItem
