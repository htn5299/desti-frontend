import React from 'react'
import { Avatar } from '@material-tailwind/react'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import Moment from 'react-moment'
import { ReviewsByPlace } from '../../utils/types'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import EmptyAvatar from '../../assets/logos/avatar.png'
import { Link } from 'react-router-dom'

import { RatingCustom } from '../index'
interface PropsState {
  review: ReviewsByPlace
}
const ReviewItem = ({ review }: PropsState) => {
  const { data: user } = useGetUserByIdQuery(`${review.user.id}` as string)
  const { rating } = review
  return (
    <div className={'rounded-lg border border-gray-300 bg-gray-50 p-4'}>
      <div className={'flex items-center gap-2'}>
        <Link to={`/users/${review.user.id}`} className={'hover:cursor-pointer'}>
          <Avatar src={user?.profile.avatar || EmptyAvatar} alt={'avatar'} />
        </Link>
        <div>
          <Link to={`/users/${review.user.id}`} className={'font-bold hover:cursor-pointer hover:underline'}>
            {review.user.name}
          </Link>
          <Moment className={'block text-gray-700'} toNow>
            {review?.updatedAt}
          </Moment>
        </div>
      </div>
      <div className={'m-3'}>
        <RatingCustom rating={rating}></RatingCustom>
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
