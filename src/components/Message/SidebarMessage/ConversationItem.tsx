import React, { useEffect, useState } from 'react'
import { ConversationsResponse, UserProfile } from '../../../utils/types'
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../../assets/profile/avatar.png'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useGetMeQuery } from '../../../redux/api/userApi'
import { setCurrentUser } from '../../../redux/features/userSlice'

interface PropState {
  conversation: ConversationsResponse
}

const ConversationItem = (prop: PropState) => {
  const { conversation } = prop
  const { data: user } = useGetMeQuery(undefined, { refetchOnMountOrArgChange: true })
  const dispatch = useAppDispatch()
  const [friend, setFriend] = useState<UserProfile>()

  useEffect(() => {
    if (user) {
      setFriend(user.id === conversation.creator.id ? conversation.recipient : conversation.creator)
    }
  }, [user, conversation])
  useEffect(() => {
    if (user) {
      dispatch(setCurrentUser(user))
    }
  }, [user, dispatch])

  return (
    <Link to={`${conversation.id}`} className={'mb-1 flex items-center gap-2 bg-gray-100 px-5'}>
      <Avatar src={friend?.profile.avatar ? `${process.env.REACT_APP_AWS_URL}${friend.profile.avatar}` : EmptyAvatar} />
      <div className={'hidden lg:block'}>
        <p>{friend?.name}</p>
        <p>{conversation.lastMessageSent?.content}</p>
        <Moment toNow>{conversation.lastMessageSent?.createdAt}</Moment>
      </div>
    </Link>
  )
}

export default ConversationItem
