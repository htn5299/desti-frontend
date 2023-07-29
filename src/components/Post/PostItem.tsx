import { ReviewFeedResponse } from '../../utils/types'
import { Avatar, Typography } from '@material-tailwind/react'
import Moment from 'react-moment'
import AvatarImage from '../../assets/profile/avatar.png'
import { useGetPlaceQuery } from '../../redux/api/placesApi'
import React, { useEffect, useRef, useState } from 'react'
import PlaceTemplate from 'components/Place/PlaceTemplate'
import * as process from 'process'
import { Link } from 'react-router-dom'
import { LikeOfReview, PostBar } from './index'
import { useCreateLikeMutation, useGetLikeQueryQuery } from '../../redux/api/likesApi'
import { RootState, useAppSelector } from '../../redux/store'
import { PostCommentList } from './PostComment'

interface PostItemProps {
  review: ReviewFeedResponse
}

function PostItem(props: PostItemProps) {
  const { review } = props
  const userId = useAppSelector((state: RootState) => state.user.id)
  const { data: place } = useGetPlaceQuery(`${review.place.id}`)
  const [isLiked, setIsLiked] = useState<Boolean>(false)
  const commentRef = useRef<HTMLTextAreaElement>(null)
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
  const onCommentRef = (event: React.MouseEvent<HTMLDivElement>) => {
    if (commentRef.current) {
      commentRef.current.focus()
    }
  }
  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiked])

  useEffect(() => {
    if (myReview && myReview[0].isLiked) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [myReview])

  return (
    <div className={'m-w-[556px] mx-auto mb-4 rounded border border-gray-400 bg-gray-100'}>
      <div>
        <div className={'p-3'}>
          <div className={'mb-3 flex items-center gap-2'}>
            <Link to={`/users/${review.user.id}`}>
              {review.user.profile.avatar && (
                <Avatar src={`${process.env.REACT_APP_AWS_URL}${review.user.profile.avatar}`} alt={'avatar'} />
              )}
              {!review.user.profile.avatar && <Avatar src={AvatarImage} alt={'avatar'} />}
            </Link>
            <div className={'flex flex-col gap-0'}>
              <Link to={`/users/${review.user.id}`} className={'text-lg font-normal'}>
                {review.user.name}
              </Link>
              <Moment className={'text-xs leading-none text-gray-500'} toNow>
                {review.updatedAt}
              </Moment>
            </div>
          </div>
          <div>
            <Typography className={'mb-2 text-lg font-light'}>{review.review}</Typography>
            <div className={'w-[320px]'}>{place && <PlaceTemplate place={place} />}</div>
          </div>
        </div>
        {/*like and comment*/}
        <div className={'flex select-none gap-2 p-3 pt-0 text-green-800'}>
          {
            <span className={'cursor-pointer hover:underline'} onClick={() => handleLike()}>
              {isLiked ? 'Unlike' : 'Like'}
            </span>
          }
          <span>·</span>
          <span className={'cursor-pointer hover:underline'} onClick={onCommentRef}>
            Comment
          </span>
        </div>
      </div>
      <LikeOfReview reviewId={review.id} isLiked={isLiked} />
      <PostCommentList reviewId={review.id} />
      <PostBar reviewId={review.id} commentRef={commentRef} />
    </div>
  )
}

export default PostItem
