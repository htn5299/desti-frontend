import React, { useState } from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useCreateReviewMutation } from '../redux/api/placesApi'
import { useParams } from 'react-router-dom'

export default function ReviewTextarea() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createReview, createReviewResult] = useCreateReviewMutation()
  const [review, setReview] = useState('')
  const { placeId } = useParams<{ placeId: string }>()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createReview({ review, placeId: parseInt(placeId as string) }).unwrap()
      setReview('')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <form onSubmit={handleSubmit} className={'rounded-xl border border-gray-500 bg-gray-50 p-4 pb-2'}>
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
  )
}
