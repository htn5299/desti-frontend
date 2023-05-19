import { AddReview, AddReviewResponse, Place, ReviewsByPlace } from '../../utils/types'
import { apiSlice } from './apiSlice'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
const placesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getPlaces: builder.query<Place[], number>({
    //   query: (page) => {
    //     return `places?page=${page}`
    //   }
    // }),
    getPlace: builder.query<Place, string>({
      query: (placeId) => {
        return {
          url: `places/${placeId}`
        }
      }
    })
  })
})
export const { useGetPlaceQuery } = placesApi
