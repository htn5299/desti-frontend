import { AddReviewAction, ReviewsByPlaceState } from '../../utils/types'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: ReviewsByPlaceState[] = []
const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<AddReviewAction>) => {
      const { placeId, review } = action.payload
      const existingPlace = state.find((item) => item.placeId === placeId)
      if (existingPlace) {
        existingPlace.reviews.push(review)
      } else {
        const newPlace = { placeId, reviews: [review] }
        state.push(newPlace)
      }
    }
  }
})
export const reviewsByPlaceState = (state: RootState) => state.places
export const selectReviews = (placeId: number) =>
  createSelector(
    reviewsByPlaceState,
    (reviewsByPlaceState) => reviewsByPlaceState.find((item) => item.placeId === placeId)?.reviews || []
  )
// how use
// const reviews = useSelector((state) => selectReviews(placeId)(state))
export const { setReviews } = placeSlice.actions
export default placeSlice.reducer
