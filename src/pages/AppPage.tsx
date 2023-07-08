import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SocketContext } from '../utils/context/SocketContext'
import { NotificationRecipientResponse } from '../utils/types'
import { toast } from 'react-toastify'
import { useGetNotificationsQuery } from '../redux/api/notificationApi'
import { NotificationFriendItem, NotificationReviewItem } from '../components/Notification'
import { ComplexNavbar } from '../components/Navbar'
import { useAppDispatch } from '../redux/store'
import { addNotification, addNotifications, clearNotifications } from '../redux/features/notificationSlice'
import { SearchBox } from '../components/Search'

const AppPage = () => {
  const { socket } = useContext(SocketContext)
  const { data: notifications, refetch } = useGetNotificationsQuery()
  const dispatch = useAppDispatch()
  useEffect(() => {
    refetch()
    notifications && dispatch(addNotifications(notifications))
    return () => {
      dispatch(clearNotifications())
    }
  }, [dispatch, notifications, refetch])

  useEffect(() => {
    if (socket) {
      socket.on('onFriendReviewReceived', (payload: NotificationRecipientResponse) => {
        dispatch(addNotification(payload))
        toast(<NotificationReviewItem notificationRecipient={payload} />)
      })
      socket.on('onFriendRequest', (payload: NotificationRecipientResponse) => {
        dispatch(addNotification(payload))
        toast(<NotificationFriendItem notificationRecipient={payload} />)
      })
      socket.on('onFriendResponse', (payload: NotificationRecipientResponse) => {
        dispatch(addNotification(payload))
        toast(<NotificationFriendItem notificationRecipient={payload} />)
      })
    }
  }, [dispatch, socket])

  return (
    <>
      <ComplexNavbar />
      <SearchBox />
      <Outlet />
    </>
  )
}

export default AppPage
