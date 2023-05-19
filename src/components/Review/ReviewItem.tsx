import React from 'react'
import { Avatar, Typography } from '@material-tailwind/react'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import Moment from 'react-moment'
import { ReviewsByPlace } from '../../utils/types'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import EmptyAvatar from '../../assets/logos/avatar.png'
import { Link } from 'react-router-dom'
interface propsState {
  review: ReviewsByPlace
}
const ReviewItem = (props: propsState) => {
  const { review } = props
  const { data: user } = useGetUserByIdQuery(`${review.user.id}` as string)
  return (
    <div className={'rounded-lg border border-gray-300 bg-gray-50 p-4'}>
      <div className={' flex items-center gap-2'}>
        <Avatar src={user?.profile.avatar || EmptyAvatar} alt={'avatar'}></Avatar>
        <div>
          <Typography className={'font-bold hover:cursor-pointer hover:underline'}>
            <Link to={`users/${review.user.id}`}>{review.user.name}</Link>
          </Typography>
          <Moment fromNow className={'text-sm  text-gray-700'}>
            {review.updatedAt}
          </Moment>
        </div>
      </div>
      <div className={'m-5'}>
        <p>{review.review}</p>
      </div>
      <div className={'flex gap-3 border-t border-gray-300 pt-2 text-gray-700'}>
        <FaceSmileIcon className={'h-5 w-5 '} />
        <p className={'font-semibold text-gray-800 hover:cursor-pointer'}>reply</p>
      </div>
    </div>
  )
}

export default ReviewItem
