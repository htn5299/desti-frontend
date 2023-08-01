import React from 'react'
import { Avatar, Typography } from '@material-tailwind/react'
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
    <Link to={`/users/${user.id}`}>
      <div className={'flex items-start gap-3'}>
        <Avatar
          variant={'square'}
          src={profile.avatar ? `${process.env.REACT_APP_AWS_URL}${profile.avatar}` : EmptyAvatar}
        />
        <Typography className={'font-semibold '}>{`${user.name}'s friends`}</Typography>
      </div>
    </Link>
  )

  return <div>{friendHeader}</div>
}

export default FriendHeader
