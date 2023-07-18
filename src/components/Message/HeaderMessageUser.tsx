import React, { useEffect, useState } from 'react'
import { useGetConversationByIdQuery } from '../../redux/api/conversationApi'
import { RootState, useAppSelector } from '../../redux/store'
import { isNum } from 'react-toastify/dist/utils'
import { UserProfile } from '../../utils/types'

interface PropState {
  conversationId: string
}

const HeaderMessageUser = (prop: PropState) => {
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
    <div className={'flex h-12 items-center bg-gray-500 px-4'}>
      <p className={'py-2 text-2xl font-bold text-gray-300'}>{friend?.name}</p>
    </div>
  )
}

export default HeaderMessageUser
