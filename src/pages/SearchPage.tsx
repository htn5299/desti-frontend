import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchPlacesQuery } from '../redux/api/placesApi'
import { useSearchUserQuery } from '../redux/api/userApi'
import { SearchList } from '../components/Search/SearchPlace'
import { SearchListUser } from '../components/Search/SearchUser'
import { Place, UserProfile } from '../utils/types'
import { MapIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Typography } from '@material-tailwind/react'

function SearchPage() {
  const [searchParams] = useSearchParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<boolean>(true)
  const q = searchParams.get('q')
  const { data: placesSearch } = useSearchPlacesQuery(`${q}`, { skip: !Boolean(q) })
  const { data: usersSearch } = useSearchUserQuery(`${q}`, { skip: !Boolean(q) })
  const [places, setPlaces] = useState<Place[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  useEffect(() => {
    if (placesSearch && Boolean(placesSearch.length)) {
      setPlaces(placesSearch)
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [placesSearch])
  useEffect(() => {
    if (usersSearch) {
      setUsers(usersSearch)
    }
  }, [usersSearch])
  return (
    <div className={'m-auto w-5/6 grid-cols-3 '}>
      <div className={'grid grid-cols-3 gap-4'}>
        <div className={'col-span-2'}>
          <Typography variant={'h5'} className={'text-GRAY-800 mb-2 border-b-2'}>
            <MapIcon className={'inline-block h-6 w-6'} />
            <span> Places</span>
          </Typography>
          <SearchList placesSearch={places} />
        </div>
        <div className={'col-span-1'}>
          <Typography variant={'h5'} className={'mb-2  border-b-2 text-gray-800'}>
            <UsersIcon className={'inline-block h-6 w-6 '} />
            <span> People</span>
          </Typography>
          <SearchListUser usersSearch={users} />
        </div>
      </div>
    </div>
  )
}

export default SearchPage
