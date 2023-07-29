import { Menu } from '@headlessui/react'
import { NotificationRecipientResponse } from '../../utils/types'
import { useGetUserByIdQuery } from '../../redux/api/userApi'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../assets/profile/avatar.png'
import Moment from 'react-moment'
import { Services } from '../../utils/constrains'
import { useNavigate } from 'react-router-dom'
import { useLazyGetReviewByIdQuery } from '../../redux/api/reviewApi'
import { useEffect } from 'react'

interface PropsState {
  notificationRecipient: NotificationRecipientResponse
}

const NotificationItem = ({ notificationRecipient }: PropsState) => {
  const { actor, content, createdAt, entity, service } = notificationRecipient.notification
  const { data: user } = useGetUserByIdQuery(`${actor.id}`)
  const navigate = useNavigate()
  const [triggerReview, reviews] = useLazyGetReviewByIdQuery()
  const onDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (service === Services.FRIENDS) {
      navigate(`users/${actor.id}`)
    } else if (service === Services.REVIEWS) {
      triggerReview(String(entity))
    }
  }
  useEffect(() => {
    if (reviews && reviews.data) {
      navigate(`/places/${reviews.data.place.id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews])

  return (
    <div className={'cursor-pointer'} onClick={onDivClick}>
      {user && (
        <Menu.Item>
          {({ active }) => (
            <div
              className={`${
                active ? ' bg-blue-500 text-white' : 'text-gray-900'
              } group flex w-full  items-center rounded-md px-2 py-2 text-sm`}
            >
              {user && (
                <div className={'flex items-center gap-2'}>
                  <Avatar
                    src={user.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${user.profile.avatar}` : EmptyAvatar}
                    alt={`${process.env.REACT_APP_AWS_URL}${user.profile.avatar}`}
                  />
                  <div>
                    <p className={'line-clamp-2'}>
                      <span className={'font-semibold'}>{user.name} </span>
                      <span>{content}</span>
                    </p>
                    <Moment className={'block text-sm text-gray-500'} toNow>
                      {createdAt}
                    </Moment>
                  </div>
                </div>
              )}
            </div>
          )}
        </Menu.Item>
      )}
    </div>
  )
}

export default NotificationItem
