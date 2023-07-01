import { apiSlice } from './apiSlice'
import { NotificationResponse } from '../../utils/types'

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationResponse[], void>({
      query: () => {
        return {
          url: `notification`,
          method: 'GET'
        }
      }
    })
  })
})
export const { useGetNotificationsQuery } = notificationApi
