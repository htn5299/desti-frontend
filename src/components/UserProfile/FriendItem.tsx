import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../assets/profile/avatar.png'
import { User } from '../../utils/types'
import { useGetUserByIdQuery } from '../../redux/api/userApi'

interface PropsState {
  friend: User
}

const FriendItem = ({ friend }: PropsState) => {
  const { data } = useGetUserByIdQuery(String(friend.id))
  return (
    <div className={'flex items-center gap-2 rounded-md px-3 py-1 hover:bg-gray-300'}>
      {data && (
        <div className={'flex items-center gap-2'}>
          <Avatar
            size={'sm'}
            src={data.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${data.profile.avatar}` : EmptyAvatar}
          />
          <Link to={`/users/${data.id}`} className={'cursor-pointer overflow-hidden'}>
            <p className={'line-clamp-1 font-semibold'}>{data.name}</p>
            <p className={'line-clamp-1'}>{data.email}</p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default FriendItem
