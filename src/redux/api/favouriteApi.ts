import { apiSlice } from './apiSlice'
import { PlaceWithImage, ResponseFavourite, SetFavouriteParams } from '../../utils/types'

const favouriteApi = apiSlice.injectEndpoints({
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
    }),
    getHerePlacesByUser: build.query<PlaceWithImage[], string>({
      query: (userId) => {
        return {
          url: `favourites/users/${userId}/here`,
          method: 'GET'
        }
      }
    }),
    getWantPlacesByUser: build.query<PlaceWithImage[], string>({
      query: (userId) => {
        return {
          url: `favourites/users/${userId}/want`,
          method: 'GET'
        }
      }
    })
  })
})
export const {
  useSetFavouriteMutation,
  useGetFavouriteQuery,
  useGetHerePlacesByUserQuery,
  useGetWantPlacesByUserQuery
} = favouriteApi
