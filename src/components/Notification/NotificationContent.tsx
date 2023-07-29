import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../assets/profile/avatar.png'
import Moment from 'react-moment'
import React from 'react'
import { NotificationResponse, UserProfile } from '../../utils/types'

interface PropState {
  notification: NotificationResponse
  active: boolean
  user: UserProfile
}

export default function NotificationContent({ notification, user, active }: PropState) {
  const { content, createdAt } = notification
  return (
    <div
      className={`${
        active ? ' bg-blue-500 text-white' : 'text-gray-900'
      } group flex w-full  items-center rounded-md px-2 py-2 text-sm`}
    >
      {user && (
        <div className={'flex items-center gap-2'}>
          <Avatar
            src={user.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${user.profile.avatar}` : EmptyAvatar}
            alt={`${process.env.REACT_APP_AWS_URL}${user.profile.avatar}`}
          />
          <div>
            <p className={'line-clamp-2'}>
              <span className={'font-semibold'}>{user.name} </span>
              <span>{content}</span>
            </p>
            <Moment className={'block text-sm text-gray-500'} toNow>
              {createdAt}
            </Moment>
          </div>
        </div>
      )}
    </div>
  )
}
