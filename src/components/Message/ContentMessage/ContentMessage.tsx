import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreateMessageMutation, useGetMessagesFromConversationQuery } from '../../../redux/api/conversationApi'
import { Avatar } from '@material-tailwind/react'
import EmptyAvatar from '../../../assets/profile/avatar.png'
import { RootState, useAppSelector } from '../../../redux/store'
import { HeaderMessageUser } from '../index'

const ContentMessage = () => {
  const user = useAppSelector((state: RootState) => state.user)
  const { conversationId } = useParams<{ conversationId: string }>()
  const { data: messages, refetch } = useGetMessagesFromConversationQuery(Number(conversationId))
  const [createMessage] = useCreateMessageMutation()
  const messagesRef = useRef<HTMLDivElement>(null)
  const [inputMessage, setInputMessage] = useState<string>('')

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [])
  const handleCreateMessage = async () => {
    try {
      await createMessage({ conversationId: Number(conversationId), content: inputMessage }).unwrap()
      refetch()
      setInputMessage('')
    } catch (e) {}
  }
  const handleCreateMessageEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (event.key === 'Enter') {
        await createMessage({ conversationId: Number(conversationId), content: inputMessage }).unwrap()
        refetch()
        setInputMessage('')
      }
    } catch (e) {}
  }

  const renderMessage =
    messages &&
    messages.messages.map((message) => {
      if (message.author.id === user.id) {
        return (
          <div className={'flex flex-col items-end '} key={message.id}>
            <div className={'my-1 flex gap-2'}>
              <span className={'rounded-2xl bg-blue-500 px-2 py-1 text-white'}>{message.content}</span>
              <Avatar
                size={'xs'}
                src={
                  message.author.profile.avatar
                    ? `${process.env.REACT_APP_AWS_URL}${message.author.profile.avatar}`
                    : EmptyAvatar
                }
              />
            </div>
          </div>
        )
      }
      return (
        <div className={'flex flex-col '} key={message.id}>
          <div className={'my-1 flex gap-2'}>
            <Avatar
              size={'xs'}
              src={
                message.author.profile.avatar
                  ? `${process.env.REACT_APP_AWS_URL}${message.author.profile.avatar}`
                  : EmptyAvatar
              }
            />
            <span className={'rounded-2xl bg-gray-500 px-2 py-1 text-white'}>{message.content}</span>
          </div>
        </div>
      )
    })

  return (
    <div className={'flex h-screen flex-col bg-white'}>
      {conversationId && <HeaderMessageUser conversationId={conversationId} />}
      <div ref={messagesRef} className='relative flex grow flex-col-reverse overflow-y-auto px-2 '>
        {renderMessage}
      </div>
      <div className='m-4 flex h-9 gap-2 '>
        <input
          onKeyDown={handleCreateMessageEnter}
          className={'w-full rounded-full border border-gray-500 bg-gray-200 px-2'}
          placeholder={'Write your message'}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className={'w-36 rounded-full bg-blue-500'} onClick={handleCreateMessage}>
          Sent
        </button>
      </div>
    </div>
  )
}

export default ContentMessage
