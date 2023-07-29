import React, { useEffect } from 'react'
import { Menu, Item, useContextMenu, ItemParams } from 'react-contexify'
import { Message } from '../../../utils/types'
import 'react-contexify/ReactContexify.css'
import { useAppDispatch } from '../../../redux/store'
import { setMessageEditId } from '../../../redux/features/appSlice'
import { useDeleteMessageFromConversationMutation } from '../../../redux/api/conversationApi'
import { deleteMessage } from '../../../redux/features/messagesSlice'

interface PropState {
  conversationId: number
  message: Message
}

export default function MessageItem({ conversationId, message }: PropState) {
  const dispatch = useAppDispatch()
  const [deleteMessageMutation, { data }] = useDeleteMessageFromConversationMutation()
  const { show } = useContextMenu({ id: String(message.id) })

  const handleEditMessage = (args: ItemParams) => {
    dispatch(setMessageEditId({ messageEditId: message.id, messageEdit: message.content }))
  }
  const handleDeleteMessage = async (args: ItemParams) => {
    await deleteMessageMutation({ conversationId, messageId: message.id })
  }
  useEffect(() => {
    if (data) {
      dispatch(deleteMessage(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className={'flex flex-col items-end'}>
      <span
        onContextMenu={(e) => show({ event: e })}
        className={'mb-1 cursor-pointer rounded-2xl bg-blue-500 px-2 py-1 text-white'}
      >
        {message.content}
      </span>
      <div>
        <Menu id={`${message.id}`}>
          <Item id='1' onClick={handleEditMessage}>
            Edit
          </Item>
          <Item id='2' onClick={() => {}}>
            Copy
          </Item>
          <Item id='3' onClick={handleDeleteMessage}>
            Delete
          </Item>
        </Menu>
      </div>
    </div>
  )
}
