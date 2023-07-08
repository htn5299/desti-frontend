import { ReviewByUserAndPlace } from '../../utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: ReviewByUserAndPlace[] = []
const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addReviews: (state, action: PayloadAction<ReviewByUserAndPlace[]>) => {
      return action.payload
    },
    addReview: (state, action: PayloadAction<ReviewByUserAndPlace>) => {
      const review = action.payload
      const reviewIndex = state.findIndex((reviewState) => reviewState.id === review.id)
      if (reviewIndex === -1) {
        state.unshift(review)
      } else {
        state.splice(reviewIndex, 1)
        state.unshift(review)
      }
    },
    removeReview: (state, action: PayloadAction<number>) => {
      const reviewId = action.payload
      const reviewIndex = state.findIndex((reviewState) => reviewState.id === reviewId)
      if (reviewIndex !== -1) {
        state.splice(reviewIndex, 1)
      }
    },
    clearReviews: (state) => {
      return []
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
export const { addReviews, addReview, clearReviews, removeReview } = placeSlice.actions
export default placeSlice.reducer
