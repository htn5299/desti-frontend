import React from 'react'
import { Link } from 'react-router-dom'
import { Place } from '../../utils/types'
interface PropsState {
  place: Place
}
const SearchItem = (props: PropsState) => {
  const { place } = props
  return (
    <div className={'rounded-md px-3 py-1 hover:bg-gray-300'}>
      <Link to={`/places/${[place.id]}`} className={' cursor-pointer '}>
        <p className={'line-clamp-1 font-semibold'}>{place.name}</p>
        <p className={'line-clamp-1'}>{place.description}</p>
      </Link>
    </div>
  )
}

export default SearchItem
