import { apiSlice } from './apiSlice'
import { NotificationRecipientResponse } from '../../utils/types'

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationRecipientResponse[], void>({
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
