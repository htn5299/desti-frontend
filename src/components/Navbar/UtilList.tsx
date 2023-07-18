import React from 'react'
import { ChatBubbleOvalLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import NotificationDropdown from '../Notification/NotificationDropdown/NotificationDropdown'
import { useAppDispatch } from '../../redux/store'
import { toggleSearch } from '../../redux/features/appSlice'
import { Link } from 'react-router-dom'

const UtilList = () => {
  const dispatch = useAppDispatch()
  const handlePopup = () => {
    dispatch(toggleSearch())
  }
  return (
    <ul className={'flex items-center gap-3 text-gray-50'}>
      <li onClick={() => handlePopup()}>
        <MagnifyingGlassIcon className={'h-6 w-6'} />
      </li>
      <li>
        <Link to={'/message'}>
          <ChatBubbleOvalLeftIcon className={'h-6 w-6'} />
        </Link>
      </li>
      <li>
        <NotificationDropdown />
      </li>
    </ul>
  )
}

export default UtilList
