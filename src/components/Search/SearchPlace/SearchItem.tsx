import React from 'react'
import { Link } from 'react-router-dom'
import { Place } from '../../../utils/types'
import { useAppDispatch } from '../../../redux/store'
import { resetSearch } from '../../../redux/features/appSlice'
import { useGetImagesQuery } from '../../../redux/api/placesApi'
import * as process from 'process'

interface PropsState {
  place: Place
}

const SearchItem = (props: PropsState) => {
  const dispatch = useAppDispatch()
  const { place } = props
  const { data: placeImages } = useGetImagesQuery(String(place.id))
  return (
    <div className={'my-1 rounded-md bg-gray-100 px-3 py-1 hover:bg-gray-300'} onClick={() => dispatch(resetSearch())}>
      <Link to={`/places/${place.id}`} className={' cursor-pointer '}>
        <p className={'line-clamp-1 font-semibold'}>{place.name}</p>
        <div className={'flex justify-between gap-2'}>
          <p className={'line-clamp-2'}>{place.description}</p>
          {placeImages && (
            <img
              className={'h-24 w-32 object-cover'}
              src={`${process.env.REACT_APP_AWS_URL}${placeImages[0].key}`}
              alt={placeImages[0].key}
            />
          )}
        </div>
      </Link>
    </div>
  )
}

export default SearchItem
