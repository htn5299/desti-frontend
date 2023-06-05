import { RootState, useAppSelector } from '../../redux/store'
import ReviewItem from './ReviewItem'

const ReviewList = () => {
  const userId = useAppSelector((state: RootState) => state.user.id) as number
  const reviews = useAppSelector((state: RootState) => state.places.reviews)
  return (
    <>
      {reviews.map((review) => userId !== review.user.id && <ReviewItem key={review.id} review={review}></ReviewItem>)}
    </>
  )
}

export default ReviewList
