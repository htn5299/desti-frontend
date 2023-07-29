import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAppDispatch } from '../../redux/store'
import { toggleSearch } from '../../redux/features/appSlice'
import { NotificationList } from '../Notification'
import { MessageDropdown } from '../Message'

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
        <MessageDropdown />
      </li>
      <li>
        <NotificationList />
      </li>
    </ul>
  )
}

export default UtilList
