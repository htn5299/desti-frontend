import { UserProfile } from '../../../utils/types'
import React, { Fragment } from 'react'
import { SearchUserItem } from './index'

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
