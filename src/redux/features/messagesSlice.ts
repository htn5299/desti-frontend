import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditMessageDto, MessagesByConversationId, OnMessagePayload, UpdateMessageResponse } from '../../utils/types'

const initialState: MessagesByConversationId[] = []

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessagesByConversationId: (state, action: PayloadAction<MessagesByConversationId>) => {
      const messagesConversation = action.payload
      const messageConversationIndex = state.findIndex(
        (messagesConversationState) => messagesConversationState.id === messagesConversation.id
      )
      if (messageConversationIndex === -1) {
        state.unshift(messagesConversation)
      } else {
        state.splice(messageConversationIndex, 1)
        state.unshift(messagesConversation)
      }
    },
    addNewMessage: (state, action: PayloadAction<OnMessagePayload>) => {
      const { message, conversation } = action.payload
      const conversationIndex = state.findIndex((conversationState) => conversationState.id === conversation.id)
      if (conversationIndex === -1) {
        state.unshift({ id: conversation.id, messages: [message] })
      } else {
        state[conversationIndex].messages.unshift(message)
      }
    },
    updateMessage: (state, action: PayloadAction<UpdateMessageResponse>) => {
      const { conversation, ...message } = action.payload
      const conversationIndex = state.findIndex((conversationState) => conversationState.id === conversation.id)
      if (conversationIndex === -1) {
        state.unshift({ id: conversation.id, messages: [message] })
      } else {
        const messageIndex = state[conversationIndex].messages.findIndex(
          (messageIndex) => messageIndex.id === message.id
        )
        if (messageIndex !== -1) state[conversationIndex].messages[messageIndex] = message
      }
    },
    deleteMessage: (state, action: PayloadAction<Omit<EditMessageDto, 'content'>>) => {
      const { messageId, conversationId } = action.payload
      const conversationIndex = state.findIndex((conversationState) => conversationState.id === conversationId)
      if (conversationIndex !== -1) {
        const messageIndex = state[conversationIndex].messages.findIndex(
          (messageIndex) => messageIndex.id === messageId
        )
        if (messageIndex !== -1) {
          state[conversationIndex].messages.splice(messageIndex, 1)
        }
      }
    }
  }
})
export const { addMessagesByConversationId, addNewMessage, updateMessage, deleteMessage } = messagesSlice.actions
export default messagesSlice.reducer
