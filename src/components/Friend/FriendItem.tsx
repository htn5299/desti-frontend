import React from 'react'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../assets/profile/avatar.png'
import { AddFriendButton } from './index'
import { Link } from 'react-router-dom'

interface PropState {
  key: number
  friendId: number
}

const FriendItem = (prop: PropState) => {
  const { friendId } = prop
  const { data: user } = useGetUserByIdQuery(String(friendId))
  return (
    <div className={'border-t px-2 py-2 hover:bg-gray-100'}>
      {user && (
        <Link to={`/users/${friendId}`}>
          <div className={'flex justify-between'}>
            <div className={'flex items-start gap-3'}>
              <Avatar
                variant={'square'}
                src={user.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${user.profile.avatar}` : EmptyAvatar}
              />
              <h2 className={''}>{user.name}</h2>
            </div>
            <AddFriendButton friendId={friendId} />
          </div>
        </Link>
      )}
    </div>
  )
}

export default FriendItem
