import { ReviewFeedResponse } from '../../utils/types'
import { Avatar, Rating } from '@material-tailwind/react'
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
import { DeleteReviewDialog } from '../Review'
import { PencilIcon } from '@heroicons/react/24/outline'
import { RatingCustom } from '../Rating'
import { toast } from 'react-toastify'
import { useUpdateMyReviewMutation } from '../../redux/api/reviewApi'

interface PostItemProps {
  review: ReviewFeedResponse
}

function PostItem(props: PostItemProps) {
  const { review } = props
  const { id: placeId } = review.place
  const userId = useAppSelector((state: RootState) => state.user.id)
  const { data: place } = useGetPlaceQuery(`${review.place.id}`)
  const [isLiked, setIsLiked] = useState<Boolean>(false)
  const [isMe, setIsMe] = useState<Boolean>(false)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const [isEdited, setIsEdited] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [reviewState, setReviewState] = useState<string>()
  const [updateReview] = useUpdateMyReviewMutation()
  const [ratingState, setRatingState] = useState<number>()
  const { data: myReview, refetch } = useGetLikeQueryQuery(
    { user: Number(userId), review: review.id },
    { skip: !userId }
  )
  const [setLike] = useCreateLikeMutation()
  // const { data: myLike, re } = useGetLikeQueryQuery({ user: userId, review: review.id }, { skip: !Boolean(userId) })
  useEffect(() => {
    if (userId === review.user.id) {
      setIsMe(true)
    }
  }, [userId, review])
  useEffect(() => {
    setReviewState(review.review)
    setRatingState(review.rating)
  }, [review])
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

  useEffect(() => {
    if (isEdited) {
      inputRef.current?.focus()
    }
  }, [isEdited])

  const handleSubmit = async () => {
    if (!ratingState || !reviewState) {
      toast.warning('rating and rating not null')
      return
    }
    try {
      await updateReview({
        placeId: Number(placeId),
        review: reviewState,
        rating: ratingState
      }).unwrap()
      setIsEdited((prevState) => !prevState)
    } catch (e) {}
  }

  const onCancelClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsEdited(false)
    setRatingState(review.rating)
    setReviewState(review.review)
  }

  return (
    <div className={' m-w-[556px] mx-auto mb-4 rounded border border-gray-400 bg-gray-100'}>
      <div>
        <div className={'p-3'}>
          <div className={'flex items-start justify-between gap-2'}>
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
            <div className={'flex items-center gap-4 p-2 text-gray-700'}>
              {isMe && !isEdited && (
                <>
                  <DeleteReviewDialog placeId={String(placeId)} myReview={review} />
                  <PencilIcon
                    className={'h-4 w-4 cursor-pointer'}
                    onClick={() => setIsEdited((prevState) => !prevState)}
                  />
                </>
              )}
              {isMe && isEdited && (
                <>
                  <div className={'cursor-pointer select-none'} onClick={onCancelClick}>
                    cancel
                  </div>
                  <div className={'cursor-pointer select-none'} onClick={handleSubmit}>
                    save
                  </div>
                </>
              )}
            </div>
          </div>

          {!isEdited && (
            <div>
              {ratingState && <RatingCustom rating={ratingState} />}
              <p className={'mb-2 text-lg font-light'}>{reviewState}</p>
            </div>
          )}
          {isMe && isEdited && (
            <>
              <Rating value={ratingState} onChange={(value) => setRatingState(value)} />
              <input
                ref={inputRef}
                className={'block w-full border-b border-blue-500 bg-blue-50 px-1 py-3 text-gray-800 outline-none'}
                value={reviewState}
                onChange={(e) => setReviewState(e.target.value)}
              />
            </>
          )}
        </div>
        <div className={'mb-2 ml-2 w-[320px]'}>{place && <PlaceTemplate place={place} />}</div>
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
