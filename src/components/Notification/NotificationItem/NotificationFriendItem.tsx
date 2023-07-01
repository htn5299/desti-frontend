import React from 'react'
import { useGetUserByIdQuery } from '../../../redux/api/userApi'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../../assets/profile/avatar.png'
import Moment from 'react-moment'
import { NotificationRecipientResponse } from '../../../utils/types'
import { formatNotification } from '../../../utils/helpers'

interface PropsState {
  notification: NotificationRecipientResponse
}
const NotificationFriendItem = ({ notification }: PropsState) => {
  const {
    id,
    notification: {
      id: notificaionId,
      actor,
      action,
      service,
      entity,
      createdAt: notificatinCreateAt,
      updatedAt: notificationUpdatedAt
    },
    createdAt,
    updatedAt,
    readAt
  } = notification
  const message = formatNotification(action, service)
  const { data: user } = useGetUserByIdQuery(String(actor.id))
  return (
    <>
      {user && (
        <div className={'flex items-center gap-2'}>
          <Avatar
            src={user.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${user.profile.avatar}` : EmptyAvatar}
            alt={`${process.env.REACT_APP_AWS_URL}${user.profile.avatar}`}
          />
          <div>
            <p className={'line-clamp-2'}>
              <span className={'font-semibold'}>{user.name} </span>
              <span>{`${message}`}</span>
            </p>
            <Moment className={'block text-sm text-gray-500'} toNow>
              {createdAt}
            </Moment>
          </div>
        </div>
      )}
    </>
  )
}

export default NotificationFriendItem
