import React, { useEffect, useRef } from 'react'
import { RootState, useAppSelector } from '../../../redux/store'
import { MessagesByConversationId } from '../../../utils/types'
import MessageItem from './MessageItem'
import MessageItemFriend from './MessageItemFriend'

interface PropState {
  messages: MessagesByConversationId
}

const MessagesList = (prop: PropState) => {
  const { messages } = prop
  const user = useAppSelector((state: RootState) => state.user)

  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [])
  const renderMessage = messages.messages.map((message) => {
    if (message.author.id === user.id) {
      return <MessageItem message={message} key={message.id} conversationId={messages.id} />
    } else {
      return <MessageItemFriend message={message} key={message.id} />
    }
  })
  return (
    <div ref={messagesRef} className='relative flex grow flex-col-reverse overflow-y-auto px-2 '>
      {renderMessage}
    </div>
  )
}

export default MessagesList
