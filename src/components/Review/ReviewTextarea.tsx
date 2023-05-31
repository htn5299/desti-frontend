import React, { useState } from 'react'
import { Button, IconButton, Rating } from '@material-tailwind/react'
import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline'

import { toast } from 'react-toastify'

import { useAppDispatch } from '../../redux/store'
import { setReviews } from '../../redux/features/placeSlice'

interface PropsState {
  placeId: string
  onRefresh: any
  addReview: any
}

export default function ReviewTextarea({ placeId, onRefresh, addReview }: PropsState) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!rating || !review) {
      toast.warning('rating and rating not null')
      return
    }
    try {
      const addReviewResponse = await addReview({
        placeId: Number(placeId),
        review,
        rating
      })
      if ('data' in addReviewResponse) {
        const yeah = addReviewResponse.data
        dispatch(
          setReviews({
            placeId: yeah.place.id,
            review: {
              id: yeah.id,
              review: yeah.review,
              rating: yeah.rating,
              updatedAt: yeah.updatedAt,
              createdAt: yeah.createdAt,
              user: yeah.user
            }
          })
        )
      }
      onRefresh()
    } catch (e) {}
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={'rounded-xl border border-gray-300 bg-gray-50 p-4 pb-2'}>
        <div className='mb-2 flex items-center gap-2 border-b border-b-gray-300 pb-4'>
          <Rating value={rating} onChange={(value) => setRating(value)} />
        </div>
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
    </>
  )
}
