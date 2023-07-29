import React, { useState } from 'react'
import { useCreateMessageMutation } from '../../../redux/api/conversationApi'

interface PropState {
  conversationId: string
}

export function MessageInput({ conversationId }: PropState) {
  const [createMessage] = useCreateMessageMutation()
  const [inputMessage, setInputMessage] = useState<string>('')

  const handleCreateMessage = async () => {
    try {
      await createMessage({ conversationId: Number(conversationId), content: inputMessage }).unwrap()
      setInputMessage('')
    } catch (e) {}
  }
  const handleCreateMessageEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (event.key === 'Enter') {
        await createMessage({ conversationId: Number(conversationId), content: inputMessage }).unwrap()
        setInputMessage('')
      }
    } catch (e) {}
  }
  return (
    <div className='m-4 flex h-9 gap-2 '>
      <input
        onKeyDown={handleCreateMessageEnter}
        className={'w-full rounded-full border border-gray-500 bg-gray-200 px-2'}
        placeholder={'Write your message'}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button className={'w-36 rounded-full bg-blue-500 text-white'} onClick={handleCreateMessage}>
        Sent
      </button>
    </div>
  )
}

export default MessageInput
