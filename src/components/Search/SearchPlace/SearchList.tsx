import React, { Fragment } from 'react'
import { Place } from '../../../utils/types'
import { SearchItem } from './index'

interface PropsState {
  placesSearch: Place[]
}

const SearchList = (props: PropsState) => {
  const { placesSearch } = props
  const rendered = placesSearch.map((place) => {
    return (
      <Fragment key={place.id}>
        <SearchItem place={place} />
      </Fragment>
    )
  })
  return <div>{rendered}</div>
}

export default SearchList
