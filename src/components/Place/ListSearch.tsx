import React from 'react'
import { Place } from '../../utils/types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
interface PropsState {
  placesSearch: Place[]
}
const ListSearch = (props: PropsState) => {
  const { placesSearch } = props
  const rendered = placesSearch.map((place) => {
    return (
      <ul key={place.id}>
        <li>{place.id}</li>
        <li>
          <Link to={`/places/${place.id}`}>{place.name}</Link>
        </li>
        <li>{place.description}</li>
        <Moment toNow>{place.updatedAt}</Moment>
        <li>{place.latitude}</li>
        <li>{place.longitude}</li>
      </ul>
    )
  })
  return <div>{rendered}</div>
}

export default ListSearch
