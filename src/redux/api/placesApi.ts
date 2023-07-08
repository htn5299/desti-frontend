import { Place, PlaceImage, PlaceWithImage } from '../../utils/types'
import { apiSlice } from './apiSlice'

const placesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlace: builder.mutation<Place, FormData>({
      query: (place) => {
        return {
          url: 'places',
          method: 'POST',
          body: place
        }
      }
    }),
    getPlace: builder.query<PlaceWithImage, string>({
      query: (placeId) => {
        return {
          url: `places/${placeId}`,
          method: 'GET'
        }
      }
    }),
    searchPlaces: builder.query<Place[], string>({
      query: (query) => {
        return {
          url: `places/search?q=${query}`,
          method: 'GET'
        }
      }
    }),
    topPlaces: builder.query<Place[], string>({
      query: (top) => {
        return {
          url: `places/top/${top}`,
          method: 'GET'
        }
      }
    }),
    getImages: builder.query<PlaceImage[], string>({
      query: (placeId) => {
        return {
          url: `places/${placeId}/images`,
          method: 'GET'
        }
      }
    })
  })
})
export const {
  useGetPlaceQuery,
  useLazySearchPlacesQuery,
  useSearchPlacesQuery,
  useCreatePlaceMutation,
  useTopPlacesQuery,
  useGetImagesQuery
} = placesApi
