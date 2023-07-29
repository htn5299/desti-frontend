import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationRecipientResponse } from 'utils/types'

const initialState: NotificationRecipientResponse[] = []
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotifications: (state, action: PayloadAction<NotificationRecipientResponse[]>) => {
      return [...state, ...action.payload]
    },
    addNotification: (state, action: PayloadAction<NotificationRecipientResponse>) => {
      state.unshift(action.payload)
    },
    clearNotifications: (state) => {
      return []
    }
  }
})
export const { addNotifications, addNotification, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer
