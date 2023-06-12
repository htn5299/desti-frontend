import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaceSmileIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Avatar, Rating } from '@material-tailwind/react'
import { useCreateReviewMutation, useGetMyReviewQuery } from '../../redux/api/reviewApi'
import { RootState, useAppSelector } from '../../redux/store'
import Moment from 'react-moment'
import EmptyAvatar from '../../assets/logos/avatar.png'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import ReviewTextarea from './ReviewTextarea'
import { RatingCustom } from '../index'

const MyReviewItem = () => {
  const userId = useAppSelector((state: RootState) => state.user.id) as number
  const { placeId } = useParams<{ placeId: string }>() as { placeId: string }
  const [isEdited, setIsEdited] = useState(false)
  const { data: myReviewData, refetch: refetchReview } = useGetMyReviewQuery({ placeId }, { skip: !Boolean(userId) })
  const { data: profile, refetch: refetchProfile } = useGetUserByIdQuery(`${userId}`, { skip: !Boolean(userId) })
  const [myReview, setMyReview] = useState<string>()
  const [myRating, setMyRating] = useState<number>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [createReview] = useCreateReviewMutation()

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
    }
  }, [myReviewData])
  const handleSubmit = async () => {
    if (!myRating || !myReview) {
      toast.warning('rating and rating not null')
      return
    }
    try {
      await createReview({
        placeId: Number(placeId),
        review: myReview,
        rating: myRating
      }).unwrap()
      setIsEdited((prevState) => !prevState)
      refetchReview()
    } catch (e) {}
  }
  return (
    <>
      {myReviewData && (
        <div className={'rounded-lg border border-gray-300 bg-gray-50 p-4'}>
          <div className={'flex items-start justify-between gap-2'}>
            <div className={'flex items-center gap-2'}>
              <Link to={`/users/${userId}`} className={'hover:cursor-pointer'}>
                <Avatar src={profile?.profile.avatar || EmptyAvatar} alt={'avatar'} />
              </Link>
              <div>
                <Link to={`/users/${userId}`} className={'font-bold hover:cursor-pointer hover:underline'}>
                  {profile?.name}
                </Link>
                {!isEdited && (
                  <Moment className={'block text-gray-700'} toNow>
                    {myReviewData?.updatedAt}
                  </Moment>
                )}
              </div>
            </div>
            <div className={'flex items-center gap-4 p-2 text-gray-700'}>
              {!isEdited && (
                <>
                  <TrashIcon className={'h-4 w-4 cursor-pointer'} />
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
          <div className={'flex gap-3 border-t border-gray-300 pt-2 text-gray-700'}>
            <FaceSmileIcon className={'h-5 w-5 '} />
            <p className={'font-semibold  text-gray-900 hover:cursor-pointer'}>reply</p>
          </div>
        </div>
      )}
      {!myReviewData && <ReviewTextarea placeId={placeId} createReview={createReview} onRefresh={refetchReview} />}
    </>
  )
}
export default MyReviewItem
