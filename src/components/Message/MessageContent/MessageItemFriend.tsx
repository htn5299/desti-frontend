import React from 'react'
import { Message } from '../../../utils/types'

interface PropState {
  message: Message
}

export default function MessageItemFriend({ message }: PropState) {
  return (
    <div className={'flex flex-col '}>
      <div className={'my-1 flex gap-2'}>
        <span className={'rounded-2xl bg-gray-500 px-2 py-1 text-white'}>{message.content}</span>
      </div>
    </div>
  )
}
