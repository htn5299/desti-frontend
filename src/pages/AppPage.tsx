import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ComplexNavbar } from '../components'
import { SocketContext } from '../utils/context/SocketContext'
import { NotificationRecipientResponse, NotificationResponse } from '../utils/types'
import { toast } from 'react-toastify'
import { Actions, Services } from '../utils/constrains'
import NotificationReviewItem from '../components/Notification/NotificationItem/NotificationReviewItem'
import NotificationFriendItem from '../components/Notification/NotificationItem/NotificationFriendItem'
import { useGetNotificationsQuery } from '../redux/api/notificationApi'

const AppPage = () => {
  const { socket } = useContext(SocketContext)
  const { data } = useGetNotificationsQuery()
  useEffect(() => {
    console.log(data)
  }, [data])
  useEffect(() => {
    if (socket) {
      socket.on('onFriendReviewReceived', (payload: NotificationRecipientResponse) => {
        console.log(payload)
        toast(<NotificationReviewItem notification={payload} />)
      })
      socket.on('onFriendRequest', (payload: NotificationRecipientResponse) => {
        toast(<NotificationFriendItem notification={payload} />)
      })
      socket.on('onFriendResponse', (payload: NotificationRecipientResponse) => {
        toast(<NotificationFriendItem notification={payload} />)
      })
    }
    return () => {}
  }, [socket])

  return (
    <>
      <ComplexNavbar />
      <Outlet />
    </>
  )
}

export default AppPage
