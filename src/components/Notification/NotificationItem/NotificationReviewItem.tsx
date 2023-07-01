import React, { useEffect } from 'react'
import { useGetUserByIdQuery } from '../../../redux/api/userApi'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../../assets/profile/avatar.png'
import Moment from 'react-moment'
import { NotificationRecipientResponse, NotificationResponse } from '../../../utils/types'
import { Services } from '../../../utils/constrains'
import { formatNotification } from '../../../utils/helpers'
import { useGetReviewByIdQuery, useGetReviewsByPlaceIdQuery } from '../../../redux/api/reviewApi'

interface PropsState {
  notification: NotificationRecipientResponse
}
const NotificationReviewItem = ({ notification }: PropsState) => {
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
  const { data: review, refetch } = useGetReviewByIdQuery(String(entity))
  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id, refetch])

  return (
    <div className={'h-16 w-80'}>
      {user && (
        <div className={'flex   items-center gap-2'}>
          <Avatar
            src={user.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${user.profile.avatar}` : EmptyAvatar}
            alt={`${process.env.REACT_APP_AWS_URL}${user.profile.avatar}`}
          />
          <div>
            <p className={'line-clamp-2'}>
              <span className={'font-semibold'}>{user.name} </span>
              <span>{`${message} ${review?.review}`}</span>
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

export default NotificationReviewItem
