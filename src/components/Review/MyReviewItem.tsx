import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Avatar, Rating } from '@material-tailwind/react'
import { useGetMyReviewQuery, useUpdateMyReviewMutation } from '../../redux/api/reviewApi'
import { RootState, useAppSelector } from '../../redux/store'
import Moment from 'react-moment'
import EmptyAvatar from '../../assets/profile/avatar.png'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import ReviewTextarea from './ReviewTextarea'
import { RatingCustom } from '../Rating'
import { DeleteReviewDialog } from './index'
import { LikeOfReview, PostBar } from '../Post'
import { useCreateLikeMutation, useGetLikeQueryQuery } from '../../redux/api/likesApi'
import { PostCommentList } from '../Post/PostComment'

const MyReviewItem = () => {
  const userId = useAppSelector((state: RootState) => state.user.id) as number
  const { placeId } = useParams<{ placeId: string }>() as { placeId: string }
  const [myReview, setMyReview] = useState<string>()
  const [myRating, setMyRating] = useState<number>()
  const [isEdited, setIsEdited] = useState(false)
  const [isLiked, setIsLiked] = useState<Boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const [updateReview] = useUpdateMyReviewMutation()
  const [setLike] = useCreateLikeMutation()

  const { data: myReviewData, refetch: refetchReview } = useGetMyReviewQuery(
    { placeId },
    {
      skip: !Boolean(userId),
      refetchOnMountOrArgChange: true
    }
  )
  const { data: profile, refetch: refetchProfile } = useGetUserByIdQuery(String(userId), { skip: !Boolean(userId) })
  const { data: myLike, refetch: retchMyLike } = useGetLikeQueryQuery(
    { user: Number(userId), review: Number(myReviewData?.id) },
    { skip: !userId || !Boolean(myReviewData) }
  )

  useEffect(() => {
    if (isEdited) {
      inputRef.current?.focus()
    }
  }, [isEdited])

  useEffect(() => {
    if (userId) {
      refetchReview()
      refetchProfile()
    }
  }, [refetchProfile, refetchReview, userId])

  useEffect(() => {
    if (myReviewData) {
      setMyReview(myReviewData.review)
      setMyRating(myReviewData.rating)
      retchMyLike()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myReviewData])
  useEffect(() => {
    myLike && setIsLiked(myLike[0].isLiked)
  }, [myLike])
  const handleSubmit = async () => {
    if (!myRating || !myReview) {
      toast.warning('rating and rating not null')
      return
    }
    try {
      await updateReview({
        placeId: Number(placeId),
        review: myReview,
        rating: myRating
      }).unwrap()
      setIsEdited((prevState) => !prevState)
    } catch (e) {}
  }

  const handleLike = async () => {
    if (!myLike) {
      myReviewData && (await setLike({ reviewId: myReviewData.id, isLiked: true }))
      setIsLiked(true)
    } else {
      myReviewData && (await setLike({ reviewId: myReviewData.id, isLiked: !myLike[0].isLiked }))
      setIsLiked(!myLike[0].isLiked)
    }
    retchMyLike()
  }

  const onCommentRef = (event: React.MouseEvent<HTMLDivElement>) => {
    if (commentRef.current) {
      commentRef.current.focus()
    }
  }

  return (
    <>
      {myReviewData && (
        <div className={'rounded-lg border border-gray-300 bg-gray-50 p-4'}>
          <div className={'flex items-start justify-between gap-2'}>
            <div className={'flex items-center gap-2'}>
              <Link to={`/users/${userId}`} className={'hover:cursor-pointer'}>
                <Avatar
                  src={
                    profile?.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${profile?.profile.avatar}` : EmptyAvatar
                  }
                  alt={'avatar'}
                />
              </Link>
              <div>
                <Link to={`/users/${userId}`} className={'font-bold hover:cursor-pointer hover:underline'}>
                  {profile?.name}
                </Link>
                {!isEdited && (
                  <Moment className={'block text-gray-700'} toNow>
                    {myReviewData.updatedAt}
                  </Moment>
                )}
              </div>
            </div>
            <div className={'flex items-center gap-4 p-2 text-gray-700'}>
              {!isEdited && (
                <>
                  <DeleteReviewDialog placeId={placeId} myReview={myReviewData} />
                  <PencilIcon
                    className={'h-4 w-4 cursor-pointer'}
                    onClick={() => setIsEdited((prevState) => !prevState)}
                  />
                </>
              )}
              {isEdited && (
                <div className={'cursor-pointer select-none'} onClick={handleSubmit}>
                  save
                </div>
              )}
            </div>
          </div>
          <div className={'m-3'}>
            {!isEdited && (
              <>
                {myRating && <RatingCustom rating={myRating} />}
                {myReview && <p>{myReview}</p>}
              </>
            )}
            {isEdited && (
              <>
                <Rating value={myRating} onChange={(value) => setMyRating(value)} />
                <input
                  ref={inputRef}
                  className={'block w-full border-b border-blue-500 bg-blue-50 px-1 py-3 text-gray-800 outline-none'}
                  value={myReview}
                  onChange={(e) => setMyReview(e.target.value)}
                />
              </>
            )}
          </div>
          <div className={'flex select-none gap-2 p-3 pt-0 text-green-800'}>
            {
              <span className={'cursor-pointer hover:underline'} onClick={() => handleLike()}>
                {isLiked ? 'Unlike' : 'Like'}
              </span>
            }
            {/*<span>{String(isLiked)}</span>*/}
            <span>·</span>
            <span className={'cursor-pointer hover:underline'} onClick={onCommentRef}>
              Comment
            </span>
          </div>
          <LikeOfReview reviewId={myReviewData.id} isLiked={isLiked} />
          <PostCommentList reviewId={myReviewData.id} />
          <PostBar reviewId={myReviewData.id} commentRef={commentRef} />
        </div>
      )}
      {!myReviewData && <ReviewTextarea placeId={placeId} refetchReview={refetchReview} />}
    </>
  )
}
export default MyReviewItem
