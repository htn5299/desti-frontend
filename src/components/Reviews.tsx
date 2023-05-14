import ReviewTextarea from './ReviewTextarea'
import { ReviewResponse } from '../utils/types'

interface PropsState {
  reviews?: ReviewResponse[]
}
const Reviews = ({ reviews }: PropsState) => {
  return <ReviewTextarea />
}

export default Reviews
