import { apiSlice } from './apiSlice'
import { NotificationRecipientResponse } from '../../utils/types'

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationRecipientResponse[], number>({
      query: (page) => {
        return {
          url: `notification?page=${page}`,
          method: 'GET'
        }
      },
      keepUnusedDataFor: 0
    })
  })
})
export const { useGetNotificationsQuery } = notificationApi
