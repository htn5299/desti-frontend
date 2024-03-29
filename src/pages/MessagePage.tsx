import React from 'react'
import { MessageSidebar } from '../components/Message'
import { Outlet } from 'react-router-dom'

const MessagePage = () => {
  return (
    <div className={'mx-auto grid w-full grid-cols-4 flex-col bg-gray-200'}>
      <div className={'col-span-1'}>
        <MessageSidebar />
      </div>
      <div className={'h col-span-3'}>
        <Outlet />
      </div>
    </div>
  )
}

export default MessagePage
