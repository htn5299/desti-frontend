import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchPlacesQuery } from '../redux/api/placesApi'
import { useSearchUserQuery } from '../redux/api/userApi'
import { MapIcon, UserIcon } from '@heroicons/react/24/outline'
import { Tab } from '@headlessui/react'
import { SearchList } from '../components/Search/SearchPlace'
import { SearchListUser } from '../components/Search/SearchUser'
import { Place, UserProfile } from '../utils/types'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const { data: placesSearch } = useSearchPlacesQuery(`${q}`, { skip: !Boolean(q) })
  const { data: usersSearch } = useSearchUserQuery(`${q}`, { skip: !Boolean(q) })
  const [places, setPlaces] = useState<Place[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])

  useEffect(() => {
    if (placesSearch) {
      setPlaces(placesSearch)
    }
  }, [placesSearch])
  useEffect(() => {
    if (usersSearch) {
      setUsers(usersSearch)
    }
  }, [usersSearch])

  return (
    <div className={'m-auto w-5/6 grid-cols-3'}>
      <Tab.Group defaultIndex={Boolean(places.length) ? 0 : 1}>
        <Tab.List className={'flex w-full justify-between gap-2 '}>
          <Tab className={'w-1/2 bg-gray-300'}>Place</Tab>
          <Tab className={'w-1/2 bg-gray-300'}>User</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>{<SearchList placesSearch={places} />}</Tab.Panel>
          <Tab.Panel>{<SearchListUser usersSearch={users} />}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default SearchPage
