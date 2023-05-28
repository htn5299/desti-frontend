import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchPlacesQuery } from '../redux/api/placesApi'
import { ListSearch } from '../components'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const { data: placesSearch } = useSearchPlacesQuery(`${q}`, { skip: !Boolean(q) })

  return (
    <div className={'m-auto w-5/6 grid-cols-3'}>
      <div>
        Place near <strong>{q}</strong>
      </div>
      <div className={'col-span-1'}>{placesSearch && <ListSearch placesSearch={placesSearch} />}</div>
    </div>
  )
}

export default SearchPage
