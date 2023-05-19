import React, { useState } from 'react'
import { Avatar, Button, IconButton, Typography } from '@material-tailwind/react'
import { FaceSmileIcon, PencilIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCreateReviewMutation, useGetReviewsByUserPlaceIdQuery } from '../../redux/api/reviewApi'
import { isErrorWithMessage } from '../../utils/helpers'
import { RootState, useAppSelector } from '../../redux/store'
import EmptyAvatar from '../../assets/logos/avatar.png'
import { useGetMeQuery } from '../../redux/api/userApi'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
interface PropsState {
  placeId: string
}

export default function ReviewTextarea({ placeId }: PropsState) {
  const [addReviewErr, setAddReviewErr] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [review, setReview] = useState('')
  const { data: user } = useGetMeQuery(undefined)
  const [addReview] = useCreateReviewMutation()
  const userId = useAppSelector((state: RootState) => state.user.id) as number
  const { data: myReview, refetch } = useGetReviewsByUserPlaceIdQuery({ userId, placeId })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await addReview({
        placeId: parseInt(placeId),
        review
      }).unwrap()
      setReview('')
      refetch()
    } catch (e) {
      if (isErrorWithMessage(e)) {
        if (e.status === 400) {
          setAddReviewErr(e.data.message as string)
        }
      } else {
        console.log(e)
      }
    }
  }
  return (
    <>
      {!myReview && (
        <form onSubmit={handleSubmit} className={'rounded-xl border border-gray-300 bg-gray-50 p-4 pb-2'}>
          <input
            className={'h-9 w-full bg-transparent outline-none'}
            placeholder={'Write your review'}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className={'flex justify-end gap-2'}>
            <IconButton variant={'text'}>
              <PhotoIcon className={'h-5 w-5'} />
            </IconButton>
            <IconButton variant={'text'}>
              <FaceSmileIcon className={'h-5 w-5'} />
            </IconButton>
            <Button type={'submit'}>Review</Button>
          </div>
        </form>
      )}
      {myReview && (
        <>
          <div className={'rounded-lg border border-gray-300 bg-gray-50 p-4'}>
            <div className={'flex justify-between'}>
              <div className={' flex items-center gap-2'}>
                <Avatar src={user?.profile.avatar || EmptyAvatar} alt={'avatar'} />
                <div>
                  <Typography className={'font-bold hover:cursor-pointer hover:underline'}>
                    <Link to={`/users/${myReview.user.id}`}>{user?.name}</Link>
                  </Typography>
                  <Moment fromNow className={'text-sm  text-gray-700'}>
                    {myReview.updatedAt}
                  </Moment>
                </div>
              </div>
              <div className={'flex gap-2 '}>
                <IconButton variant={'text'}>
                  <TrashIcon className={'h-4 w-4 text-gray-700'} />
                </IconButton>
                <IconButton variant={'text'}>
                  <PencilIcon className={'h-4 w-4 text-gray-700'} />
                </IconButton>
              </div>
            </div>
            <div className={' m-5'}>
              <p>{myReview.review}</p>
            </div>
            <div className={'flex gap-3 border-t border-gray-300 pt-2 text-gray-700'}>
              <FaceSmileIcon className={'h-5 w-5 '} />
              <p className={'font-semibold text-gray-800 hover:cursor-pointer'}>reply</p>
            </div>
          </div>
        </>
      )}
      {addReviewErr && <p>{addReviewErr}</p>}
    </>
  )
}
