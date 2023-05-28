import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Rating } from '@material-tailwind/react'
import { FaceSmileIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ReviewsByPlace } from '../../utils/types'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import EmptyAvatar from '../../assets/logos/avatar.png'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { toast } from 'react-toastify'
interface PropsState {
  review: ReviewsByPlace
  placeId: string
  onRefresh: any
  addReview: any
}
const MyReviewItem = ({ review, placeId, onRefresh, addReview }: PropsState) => {
  const { data: user } = useGetUserByIdQuery(`${review.user.id}` as string)
  const [isEdited, setIsEdited] = useState(false)
  const [myReview, setMyReview] = useState(review.review)
  const [myRating, setMyRating] = useState(review.rating)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEdited) {
      inputRef.current?.focus()
    }
  }, [isEdited])

  const handleSubmit = async () => {
    if (!myRating || !myReview) {
      toast.warning('rating and rating not null')
      return
    }
    try {
      await addReview({
        placeId: Number(placeId),
        review: myReview,
        rating: myRating
      })
      onRefresh()
      setIsEdited((prevState) => !prevState)
    } catch (e) {}
  }
  return (
    <div className={'rounded-lg border border-gray-300 bg-gray-50 p-4'}>
      <div className={'flex items-start justify-between gap-2'}>
        <div className={'flex items-center gap-2'}>
          <Link to={`/users/${review.user.id}`} className={'hover:cursor-pointer'}>
            <Avatar src={user?.profile.avatar || EmptyAvatar} alt={'avatar'} />
          </Link>
          <div>
            <Link to={`/users/${review.user.id}`} className={'font-bold hover:cursor-pointer hover:underline'}>
              {review.user.name}
            </Link>
            {!isEdited && (
              <Moment className={'block text-gray-700'} toNow>
                {review?.updatedAt}
              </Moment>
            )}
          </div>
        </div>
        <div className={'flex items-center gap-4 p-2 text-gray-700'}>
          {!isEdited && (
            <>
              <TrashIcon className={'h-4 w-4 cursor-pointer'} />
              <PencilIcon className={'h-4 w-4 cursor-pointer'} onClick={() => setIsEdited((prevState) => !prevState)} />
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
            <Rating value={myRating} readonly />
            <p>{review.review}</p>
          </>
        )}
        {isEdited && (
          <>
            <Rating value={myRating} onChange={(value) => setMyRating(value)} />
            <input
              ref={inputRef}
              className={'block w-full bg-transparent text-gray-800 outline-none'}
              value={myReview}
              onChange={(e) => setMyReview(e.target.value)}
            />
          </>
        )}
      </div>
      <div className={'flex gap-3 border-t border-gray-300 pt-2 text-gray-700'}>
        <FaceSmileIcon className={'h-5 w-5 '} />
        <p className={'font-semibold  text-gray-900 hover:cursor-pointer'}>reply</p>
      </div>
    </div>
  )
}
export default MyReviewItem
