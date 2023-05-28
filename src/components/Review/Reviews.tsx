import { ReviewsByPlace } from '../../utils/types'
import ReviewTextarea from './ReviewTextarea'
import ReviewItem from './ReviewItem'
import MyReviewItem from './MyReviewItem'
import { useCreateReviewMutation, useGetReviewsByUserPlaceIdQuery } from '../../redux/api/reviewApi'
import { useAppSelector } from '../../redux/store'

interface PropsState {
  reviews?: ReviewsByPlace[]
  placeId: string
}
const Reviews = ({ reviews, placeId }: PropsState) => {
  const userId = useAppSelector((state) => state.user.id) as number
  const { data: myReview, refetch } = useGetReviewsByUserPlaceIdQuery({ userId, placeId })
  const otherReviews = myReview ? reviews?.filter((review) => review.id !== myReview.id) : reviews
  const renderedReviewItem = otherReviews?.map((review) => <ReviewItem review={review} key={review.id} />)
  const [addReview] = useCreateReviewMutation()
  return (
    <div className={'mt-10 flex flex-col gap-2'}>
      <div className={'mt-8 font-semibold text-gray-900'}>Your Review</div>
      {!myReview && <ReviewTextarea placeId={placeId} onRefresh={refetch} addReview={addReview} />}
      {myReview && <MyReviewItem placeId={placeId} review={myReview} onRefresh={refetch} addReview={addReview} />}
      {Boolean(otherReviews?.length) && <div className={'mt-8 font-semibold text-gray-900'}>Reviews</div>}
      {renderedReviewItem}
    </div>
  )
}

export default Reviews
