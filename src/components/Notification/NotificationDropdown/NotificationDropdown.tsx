import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { BellIcon } from '@heroicons/react/24/outline'
import NotificationReviewItem from '../NotificationItem/NotificationReviewItem'
import { NotificationRecipientResponse } from '../../../utils/types'
import { Services } from '../../../utils/constrains'
import { RootState, useAppSelector } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLazyGetReviewByIdQuery } from '../../../redux/api/reviewApi'
import { useLazyGetFriendByIdQuery } from '../../../redux/api/friendsApi'
import { NotificationFriendItem } from '../index'

export default function NotificationDropdown() {
  const notifications = useAppSelector((state: RootState) => state.notifications)
  const navigate = useNavigate()
  const [triggerReview, reviews] = useLazyGetReviewByIdQuery()
  const [triggerFriend, friends] = useLazyGetFriendByIdQuery()
  const handleClick = (notification: NotificationRecipientResponse) => {
    if (notification.notification.service === Services.REVIEWS) {
      triggerReview(String(notification.notification.entity))
    } else if (notification.notification.service === Services.FRIENDS) {
      triggerFriend(notification.notification.entity)
    }
  }
  useEffect(() => {
    if (reviews && reviews.data) {
      navigate(`/places/${reviews.data.place.id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews])

  useEffect(() => {
    if (friends && friends.data) {
      navigate(`/users/${friends.data.id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends])

  const rendered = notifications.map((notification) => {
    return (
      <MenuItem key={notification.id} onClick={() => handleClick(notification)}>
        {notification.notification.service === Services.REVIEWS && (
          <NotificationReviewItem notificationRecipient={notification} />
        )}
        {notification.notification.service === Services.FRIENDS && (
          <NotificationFriendItem notificationRecipient={notification} />
        )}
      </MenuItem>
    )
  })
  return (
    <Menu>
      <MenuHandler>
        <div className='flex cursor-pointer items-center gap-2 text-gray-50'>
          <BellIcon className={'h-6 w-6'} />
        </div>
      </MenuHandler>
      <MenuList>{rendered}</MenuList>
    </Menu>
  )
}
