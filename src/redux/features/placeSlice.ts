import { ReviewByUserAndPlace, ReviewsState } from '../../utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: ReviewsState = {
  reviews: []
}
const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addReviews: (state, action: PayloadAction<ReviewByUserAndPlace[]>) => {
      state.reviews = action.payload
    },
    addReview: (state, action: PayloadAction<ReviewByUserAndPlace>) => {
      const review = action.payload
      const reviewIndex = state.reviews.findIndex((reviewState) => reviewState.id === review.id)
      if (reviewIndex === -1) {
        state.reviews.unshift(review)
      } else {
        state.reviews.splice(reviewIndex, 1)
        state.reviews.unshift(review)
      }
    },
    clearReviews: (state) => {
      state.reviews = []
    }
  }
})
export const reviewsByPlaceState = (state: RootState) => state.places
// export const selectReviews = (placeId: number) =>
//   createSelector(
//     reviewsByPlaceState,
//     (reviewsByPlaceState) => reviewsByPlaceState.find((item) => item.placeId === placeId)?.reviews || []
//   )
// // how use
// // const reviews = useSelector((state) => selectReviews(placeId)(state))
export const { addReviews, addReview, clearReviews } = placeSlice.actions
export default placeSlice.reducer
