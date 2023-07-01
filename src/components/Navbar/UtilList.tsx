import React from 'react'
import { BellIcon, ChatBubbleOvalLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import NotificationDropdown from '../Notification/NotificationDropdown/NotificationDropdown'

const UtilList = () => {
  return (
    <ul className={'flex items-center gap-3 text-gray-50'}>
      <li>
        <MagnifyingGlassIcon className={'h-6 w-6'} />
      </li>
      <li>
        <ChatBubbleOvalLeftIcon className={'h-6 w-6'} />
      </li>
      <li>
        <NotificationDropdown />
      </li>
    </ul>
  )
}

export default UtilList
