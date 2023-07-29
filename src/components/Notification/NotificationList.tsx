import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import { NotificationItem } from './index'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { useGetNotificationsQuery } from '../../redux/api/notificationApi'
import { addNotifications } from '../../redux/features/notificationSlice'

const NotificationList = () => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const { data: notificationsApi } = useGetNotificationsQuery(page)
  useEffect(() => {
    notificationsApi && dispatch(addNotifications(notificationsApi))
  }, [dispatch, notificationsApi])
  useEffect(() => {
    console.log(page)
  }, [page])
  const notifications = useAppSelector((state: RootState) => state.notifications)
  return (
    <div className='flex items-center text-right '>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='flex items-center  text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            <BellIcon className=' h-6 w-6 text-white' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 max-h-[500px]  w-80   origin-top-right divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {notifications &&
              notifications.map((notification, i) => {
                return <NotificationItem notificationRecipient={notification} key={notification.id} />
              })}
            <div
              onClick={() => setPage((prevState) => prevState + 1)}
              className={'flex justify-center py-2 text-blue-800'}
            >
              <span>See more</span>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default NotificationList
