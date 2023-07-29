import React, { Fragment, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SocketContext } from '../utils/context/SocketContext'
import {
  ConversationsResponse,
  DeleteMessagePayload,
  NotificationRecipientResponse,
  OnMessagePayload,
  UpdateMessageResponse
} from '../utils/types'
import { toast } from 'react-toastify'
import { NotificationToast } from '../components/Notification'
import { useAppDispatch } from '../redux/store'
import { addNotification } from '../redux/features/notificationSlice'
import { SearchBox } from '../components/Search'
import { useGetConversationsQuery } from '../redux/api/conversationApi'
import { addConversation, addConversations, updateConversation } from '../redux/features/conversationSlice'
import { addNewMessage, deleteMessage, updateMessage } from '../redux/features/messagesSlice'

const AppPage = () => {
  const { socket } = useContext(SocketContext)
  const { data: conversations, refetch: refetchConversations } = useGetConversationsQuery(undefined)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (conversations) dispatch(addConversations(conversations))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations])

  useEffect(() => {
    if (socket) {
      socket.on('onFriendReviewReceived', (payload: NotificationRecipientResponse) => {
        dispatch(addNotification(payload))
        toast(<NotificationToast notificationRecipient={payload} />)
      })
      socket.on('onFriendRequest', (payload: NotificationRecipientResponse) => {
        dispatch(addNotification(payload))
        toast(<NotificationToast notificationRecipient={payload} />)
      })
      socket.on('onFriendResponse', (payload: NotificationRecipientResponse) => {
        dispatch(addNotification(payload))
        refetchConversations()
        toast(<NotificationToast notificationRecipient={payload} />)
      })
      socket.on('onConversation', (payload: ConversationsResponse) => {
        dispatch(addConversation(payload))
      })
      socket.on('onMessage', (payload: OnMessagePayload) => {
        dispatch(updateConversation(payload.conversation))
        dispatch(addNewMessage(payload))
      })
      socket.on('onMessageDelete', (payload: DeleteMessagePayload) => {
        dispatch(deleteMessage(payload))
      })
      socket.on('onMessageUpdate', (payload: UpdateMessageResponse) => {
        dispatch(updateMessage(payload))
      })
      socket.on('onCommentCreate', (payload: NotificationRecipientResponse) => {
        dispatch(addNotification(payload))
        toast(<NotificationToast notificationRecipient={payload} />)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, socket])

  return (
    <>
      <SearchBox />
      <Outlet />
    </>
  )
}

export default AppPage
