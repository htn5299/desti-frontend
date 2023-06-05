import MyReviewItem from './MyReviewItem'
import ReviewTextarea from './ReviewTextarea'
import { useParams } from 'react-router-dom'
import { useGetReviewsByPlaceIdQuery } from '../../redux/api/reviewApi'
import React, { useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { addReviews, clearReviews } from '../../redux/features/placeSlice'
import { ReviewList } from '../index'

const Reviews = () => {
  const { placeId } = useParams<{ placeId: string }>() as { placeId: string }
  const dispatch = useAppDispatch()
  const { data } = useGetReviewsByPlaceIdQuery(placeId)
  useEffect(() => {
    if (data) {
      dispatch(addReviews(data))
    }
    return () => {
      dispatch(clearReviews())
    }
  }, [data, dispatch])
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'font-semibold text-gray-900'}>Your Review</div>
      <MyReviewItem />
      <div className={'mt-8 font-semibold text-gray-900'}>Reviews</div>
      <ReviewList />
    </div>
  )
}
// {!myReview && <ReviewTextarea placeId={placeId} onRefresh={refetch} addReview={addReview} />}
// {myReview && <MyReviewItem placeId={placeId} review={myReview} onRefresh={refetch} addReview={addReview} />}
// {Boolean(selectReviews?.length) && <div className={'mt-8 font-semibold text-gray-900'}>Reviews</div>}
// {renderedReviewItem}
export default Reviews
