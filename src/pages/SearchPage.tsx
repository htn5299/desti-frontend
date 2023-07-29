import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchPlacesQuery } from '../redux/api/placesApi'
import { useSearchUserQuery } from '../redux/api/userApi'
import { Tab } from '@headlessui/react'
import { SearchList } from '../components/Search/SearchPlace'
import { SearchListUser } from '../components/Search/SearchUser'
import { Place, UserProfile } from '../utils/types'
import { MapIcon, UserIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

function SearchPage() {
  const [searchParams] = useSearchParams()
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
    <div className={'m-auto w-5/6 grid-cols-3'}>
      <Tab.Group defaultIndex={selected ? 0 : 1}>
        <Tab.List className={'my-2 flex w-1/3 justify-between gap-2'}>
          <Tab
            className={classNames('w-1/2 rounded bg-gray-300 ', { 'bg-blue-400': selected })}
            onClick={() => setSelected(true)}
          >
            <div className={'flex gap-2 p-2'}>
              <MapIcon className={'h-6 w-6'} />
              <span>Places</span>
            </div>
          </Tab>
          <Tab
            className={classNames('w-1/2 rounded bg-gray-300 ', { 'bg-blue-400': !selected })}
            onClick={() => setSelected(false)}
          >
            <div className={'flex gap-2 p-2'}>
              <UserIcon className={'h-6 w-6'} />
              <span>User</span>
            </div>
          </Tab>
        </Tab.List>
        <Tab.Panels className={'w-2/3'}>
          <Tab.Panel>{<SearchList placesSearch={places} />}</Tab.Panel>
          <Tab.Panel>{<SearchListUser usersSearch={users} />}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default SearchPage
