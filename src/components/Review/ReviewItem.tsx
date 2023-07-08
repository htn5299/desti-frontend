import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-tailwind/react'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import Moment from 'react-moment'
import { ReviewsByPlace } from '../../utils/types'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import EmptyAvatar from '../../assets/profile/avatar.png'
import { Link } from 'react-router-dom'
import { RatingCustom } from '../Rating'
import { RootState, useAppSelector } from '../../redux/store'
import { useGetPlaceQuery } from '../../redux/api/placesApi'
import { useCreateLikeMutation, useGetLikeQueryQuery } from '../../redux/api/likesApi'
import { LikeOfReview, PostBar } from '../Post'
import { PostCommentList } from '../Post/PostComment'

interface PropsState {
  review: ReviewsByPlace
}

const ReviewItem = (props: PropsState) => {
  const { review } = props
  const { data: user } = useGetUserByIdQuery(`${review.user.id}` as string)
  const { rating } = review
  const userId = useAppSelector((state: RootState) => state.user.id)
  const [isLiked, setIsLiked] = useState<Boolean>(false)
  const { data: myReview, refetch } = useGetLikeQueryQuery(
    { user: Number(userId), review: review.id },
    { skip: !userId }
  )
  const [setLike] = useCreateLikeMutation()
  // const { data: myLike, re } = useGetLikeQueryQuery({ user: userId, review: review.id }, { skip: !Boolean(userId) })

  const handleLike = async () => {
    if (myReview && myReview[0].isLiked) {
      await setLike({ reviewId: review.id, isLiked: false })
      setIsLiked(false)
    } else {
      await setLike({ reviewId: review.id, isLiked: true })
      setIsLiked(true)
    }
    refetch()
  }

  useEffect(() => {
    refetch()
  }, [isLiked])

  useEffect(() => {
    if (myReview && myReview[0].isLiked) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [myReview])
  return (
    <div className={'rounded-lg border border-gray-300 bg-gray-50 p-4'}>
      <div className={'flex items-center gap-2'}>
        <Link to={`/users/${review.user.id}`} className={'hover:cursor-pointer'}>
          <Avatar
            src={user?.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${user.profile.avatar}` : EmptyAvatar}
            alt={'avatar'}
          />
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
      {/*<div className={'flex gap-3 border-t border-gray-300 pt-2 text-gray-700'}>*/}
      {/*  <FaceSmileIcon className={'h-5 w-5 '} />*/}
      {/*  <p className={'font-semibold text-gray-800 hover:cursor-pointer'}>reply</p>*/}
      {/*</div>*/}
      <div className={'flex select-none gap-2 p-3 pt-0 text-green-800'}>
        {
          <span className={'cursor-pointer hover:underline'} onClick={() => handleLike()}>
            {isLiked ? 'Unlike' : 'Like'}
          </span>
        }
        <span>·</span>
        <span className={'cursor-pointer hover:underline'}>Comment</span>
      </div>
      <LikeOfReview reviewId={review.id} isLiked={isLiked} />
      <PostCommentList reviewId={review.id} />
      <PostBar reviewId={review.id} />
    </div>
  )
}

export default ReviewItem
