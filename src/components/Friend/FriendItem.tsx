import React, { useEffect } from 'react'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../assets/profile/avatar.png'
import { AddFriendButton } from './index'
import { useCheckFriendQuery, useRequestFriendMutation } from '../../redux/api/friendsApi'

interface PropState {
  key: number
  friendId: number
}

const FriendItem = (prop: PropState) => {
  const { friendId } = prop
  const { data: user } = useGetUserByIdQuery(String(friendId))
  return (
    <div className={'border-t py-2'}>
      {user && (
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
      )}
    </div>
  )
}

export default FriendItem
