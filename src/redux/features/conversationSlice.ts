import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConversationsResponse } from '../../utils/types'

const initialState: ConversationsResponse[] = []

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversations: (state, action: PayloadAction<ConversationsResponse[]>) => {
      return action.payload
    },
    addConversation: (state, action: PayloadAction<ConversationsResponse>) => {
      state.unshift(action.payload)
    },
    updateConversation: (state, action: PayloadAction<ConversationsResponse>) => {
      const conversation = action.payload
      const conversationIndex = state.findIndex((conversationState) => conversationState.id === conversation.id)
      if (conversationIndex === -1) {
        state.unshift(conversation)
      } else {
        state.splice(conversationIndex, 1)
        state.unshift(conversation)
      }
    },
    deleteConversations: (state) => {
      return []
    }
  }
})
export const { addConversations, addConversation, updateConversation, deleteConversations } = conversationSlice.actions
export default conversationSlice.reducer
