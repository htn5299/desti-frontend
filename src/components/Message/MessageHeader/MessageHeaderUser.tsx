import React, { useEffect, useState } from 'react'
import { useGetConversationByIdQuery } from '../../../redux/api/conversationApi'
import { RootState, useAppSelector } from '../../../redux/store'
import { UserProfile } from '../../../utils/types'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../../assets/profile/avatar.png'
import { Link } from 'react-router-dom'

interface PropState {
  conversationId: string
}

const MessageHeaderUser = (prop: PropState) => {
  const user = useAppSelector((state: RootState) => state.user)
  const { conversationId } = prop
  const { data: conversation } = useGetConversationByIdQuery(Number(conversationId))
  const [friend, setFriend] = useState<UserProfile | null>()
  useEffect(() => {
    if (conversation && user) {
      setFriend(user.id === conversation.creator.id ? conversation.recipient : conversation.creator)
    }
  }, [conversation, user])

  return (
    <Link to={`/users/${friend?.id}`} className={'flex h-12 items-center gap-2 bg-gray-500 px-4'}>
      <Avatar
        size={'xs'}
        src={friend?.profile?.avatar ? `${process.env.REACT_APP_AWS_URL}${friend?.profile.avatar}` : EmptyAvatar}
      />
      <p className={'py-2 text-2xl font-bold text-gray-300'}>{friend?.name}</p>
    </Link>
  )
}

export default MessageHeaderUser
