import { apiSlice } from './apiSlice'
import { PlaceWithImage, ResponseFavourite, SetFavouriteParams, User } from '../../utils/types'

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
    }),
    getHereUsersByPlace: build.query<User[], string>({
      query: (placeId) => {
        return {
          url: `favourites/places/${placeId}/here`,
          method: 'GET'
        }
      }
    }),
    getWantUsersByPlace: build.query<User[], string>({
      query: (placeId) => {
        return {
          url: `favourites/places/${placeId}/want`,
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
  useGetWantPlacesByUserQuery,
  useGetHereUsersByPlaceQuery,
  useGetWantUsersByPlaceQuery
} = favouriteApi
