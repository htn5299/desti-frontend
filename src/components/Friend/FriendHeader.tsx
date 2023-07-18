import React from 'react'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../assets/profile/avatar.png'
import { Link } from 'react-router-dom'
import { UserProfile } from '../../utils/types'

interface PropState {
  user: UserProfile
}

const FriendHeader = (prop: PropState) => {
  const { user } = prop
  const profile = user.profile
  const friendHeader = (
    <div className={'flex justify-between '}>
      <div className={'flex items-start gap-3'}>
        <Avatar
          variant={'square'}
          src={profile.avatar ? `${process.env.REACT_APP_AWS_URL}${profile.avatar}` : EmptyAvatar}
        />
        <h2 className={'font-semibold '}>{`${user.name}'s Friends`}</h2>
      </div>
      <div>
        <Link to={`/users/${user.id}`}>{`${user.name}'s profile`}</Link>
      </div>
    </div>
  )

  return <div>{friendHeader}</div>
}

export default FriendHeader
