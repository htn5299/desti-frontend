import { apiSlice } from './apiSlice'
import {
  ConversationsResponse,
  CreateConversationDto,
  CreateConversationResponse,
  CreateMessageDto,
  EditMessageDto,
  MessagesByConversationId,
  UpdateMessageResponse
} from '../../utils/types'

const conversationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createConversation: build.mutation<CreateConversationResponse, CreateConversationDto>({
      query: (body) => {
        return {
          url: 'conversations',
          method: 'POST',
          body: body
        }
      }
    }),
    getConversations: build.query<ConversationsResponse[], undefined>({
      query: () => {
        return {
          url: 'conversations',
          method: 'GET'
        }
      }
    }),
    getConversationById: build.query<ConversationsResponse, number>({
      query: (id) => {
        return {
          url: `conversations/${id}`,
          method: 'GET'
        }
      }
    }),
    createMessage: build.mutation<any, CreateMessageDto>({
      query: (body) => {
        const { content, conversationId } = body
        const message = { content: content }
        return {
          url: `conversations/${conversationId}/messages`,
          method: 'POST',
          body: message
        }
      }
    }),
    getMessagesFromConversation: build.query<MessagesByConversationId, number>({
      query: (id) => {
        return {
          url: `conversations/${id}/messages`,
          method: 'GET'
        }
      }
    }),
    editMessage: build.mutation<UpdateMessageResponse, EditMessageDto>({
      query: (body) => {
        const { content, conversationId, messageId } = body
        const message = { content: content }
        return {
          url: `conversations/${conversationId}/messages/${messageId}`,
          method: 'PATCH',
          body: message
        }
      }
    }),
    deleteMessageFromConversation: build.mutation<any, Omit<EditMessageDto, 'content'>>({
      query: (body) => {
        const { conversationId, messageId } = body
        return {
          url: `conversations/${conversationId}/messages/${messageId}`,
          method: 'DELETE'
        }
      }
    })
  })
})
export const {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useGetConversationByIdQuery,
  useCreateMessageMutation,
  useGetMessagesFromConversationQuery,
  useEditMessageMutation,
  useDeleteMessageFromConversationMutation
} = conversationApi
