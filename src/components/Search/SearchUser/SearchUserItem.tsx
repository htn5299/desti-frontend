import React from 'react'
import { resetSearch } from '../../../redux/features/appSlice'
import { Link } from 'react-router-dom'
import { UserProfile } from '../../../utils/types'
import { useAppDispatch } from '../../../redux/store'

interface PropsState {
  user: UserProfile
}

const SearchUserItem = (prop: PropsState) => {
  const dispatch = useAppDispatch()

  const { user } = prop
  return (
    <div className={'rounded-md px-3 py-1 hover:bg-gray-300'} onClick={() => dispatch(resetSearch())}>
      <Link to={`/users/${user.id}`} className={' cursor-pointer '}>
        <p className={'line-clamp-1 font-semibold'}>{user.name}</p>
        <p className={'line-clamp-1'}>{user.email}</p>
      </Link>
    </div>
  )
}

export default SearchUserItem
