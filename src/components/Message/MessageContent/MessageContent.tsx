import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMessagesFromConversationQuery } from '../../../redux/api/conversationApi'

import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store'
import { MessageHeaderUser, MessageInput, MessageInputEdit, MessagesList } from '../index'
import { addMessagesByConversationId } from '../../../redux/features/messagesSlice'

const MessageContent = () => {
  const { conversationId } = useParams<{ conversationId: string }>()
  const { data: messages } = useGetMessagesFromConversationQuery(Number(conversationId))
  const dispatch = useAppDispatch()
  const messagesState = useAppSelector((state: RootState) =>
    state.messages.find((state) => state.id === Number(conversationId))
  )
  const messageEditId = useAppSelector((state: RootState) => state.context.messageEditId)
  useEffect(() => {
    if (messages) dispatch(addMessagesByConversationId(messages))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return (
    <div className={'flex h-screen flex-col bg-white'}>
      {conversationId && <MessageHeaderUser conversationId={conversationId} />}
      {messagesState && <MessagesList messages={messagesState} />}
      {!messageEditId && conversationId && <MessageInput conversationId={conversationId} />}
      {messageEditId && conversationId && (
        <MessageInputEdit messageEditId={messageEditId} conversationId={Number(conversationId)} />
      )}
    </div>
  )
}

export default MessageContent
