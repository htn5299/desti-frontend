import { ReviewsByPlace } from '../../utils/types'
import ReviewTextarea from './ReviewTextarea'
import ReviewItem from './ReviewItem'
import { useGetReviewsByUserPlaceIdQuery } from '../../redux/api/reviewApi'
import { useAppSelector } from '../../redux/store'
import React, { useState } from 'react'
import { Rating, Typography } from '@material-tailwind/react'
interface PropsState {
  reviews?: ReviewsByPlace[]
  placeId: string
}
const Reviews = ({ reviews, placeId }: PropsState) => {
  const [rated, setRated] = useState(0)
  const userId = useAppSelector((state) => state.user.id) as number
  const { data: myReview } = useGetReviewsByUserPlaceIdQuery({ userId, placeId })
  const otherReviews = myReview ? reviews?.filter((review) => review.id !== myReview.id) : reviews
  const renderedReviewItem = otherReviews?.map((review) => <ReviewItem review={review} key={review.id} />)
  return (
    <div className={'mt-10 flex flex-col gap-2'}>
      <div className='flex items-center gap-2'>
        <div className={'font-semibold text-gray-900 '}>Your rating</div>
        <Rating value={rated} onChange={(value) => setRated(value)} />
      </div>
      <div className={'font-semibold text-gray-900 '}>Your review</div>
      <ReviewTextarea placeId={placeId} />
      {Boolean(otherReviews?.length) && <div className={'mt-8 font-semibold text-gray-900'}>Reviews</div>}
      {renderedReviewItem}
    </div>
  )
}

export default Reviews