import { apiSlice } from './apiSlice'
import { ResponseFavourite, SetFavouriteParams } from '../../utils/types'

const apiFavourite = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    setFavourite: build.mutation<any, SetFavouriteParams>({
      query: (content) => {
        return {
          url: `favourites`,
          method: 'POST',
          body: content
        }
      }
    }),
    getFavourite: build.query<ResponseFavourite, number>({
      query: (placeId) => {
        return {
          url: `favourites?place=${placeId}`,
          method: 'GET'
        }
      }
    })
  })
})
export const { useSetFavouriteMutation, useGetFavouriteQuery } = apiFavourite
