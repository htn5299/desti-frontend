import { UserProfile } from '../../../utils/types'
import React, { Fragment } from 'react'
import { SearchItem } from '../SearchPlace'
import { SearchUserItem } from './index'
import { useAppDispatch } from '../../../redux/store'

interface PropsState {
  usersSearch: UserProfile[]
}

const SearchListUser = (prop: PropsState) => {
  const { usersSearch } = prop
  const rendered = usersSearch.map((user) => {
    return (
      <Fragment key={user.id}>
        <SearchUserItem user={user} />
      </Fragment>
    )
  })
  return <div>{rendered}</div>
}

export default SearchListUser
