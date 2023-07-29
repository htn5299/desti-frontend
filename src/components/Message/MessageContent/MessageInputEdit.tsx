import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store'
import React, { useEffect, useRef, useState } from 'react'
import { useEditMessageMutation } from '../../../redux/api/conversationApi'
import { setMessageEditId } from '../../../redux/features/appSlice'
import { updateMessage } from '../../../redux/features/messagesSlice'

interface PropState {
  messageEditId: number
  conversationId: number
}

export default function MessageInputEdit({ messageEditId, conversationId }: PropState) {
  const [inputMessage, setInputMessage] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const message = useAppSelector((state: RootState) => state.context.messageEdit)
  useEffect(() => {
    setInputMessage(message)
    if (inputRef.current) {
      inputRef.current.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])
  const dispatch = useAppDispatch()
  const [updateMessageMutation, { data }] = useEditMessageMutation()
  const handleUpdateMessage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await updateMessageMutation({
      messageId: messageEditId,
      conversationId: conversationId,
      content: inputMessage
    }).unwrap()
    dispatch(setMessageEditId({ messageEditId: null, messageEdit: '' }))
  }
  const handleCreateMessageEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (event.key === 'Enter') {
        await updateMessageMutation({
          messageId: messageEditId,
          conversationId: conversationId,
          content: inputMessage
        }).unwrap()
        setInputMessage('')
        dispatch(setMessageEditId({ messageEditId: null, messageEdit: '' }))
      }
    } catch (e) {}
  }
  useEffect(() => {
    if (data) {
      dispatch(updateMessage(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <div className='m-4 flex h-9 gap-2 '>
      <input
        ref={inputRef}
        onKeyDown={handleCreateMessageEnter}
        className={'w-full rounded-full border border-gray-500 bg-gray-200 px-2'}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder={'edit text'}
      />
      <button className={'w-36 rounded-full bg-blue-500 text-white'} onClick={handleUpdateMessage}>
        Sent
      </button>
    </div>
  )
}
