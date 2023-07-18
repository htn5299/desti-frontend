import React, { Fragment, useEffect } from 'react'
import { ConversationsResponse } from '../../../utils/types'
import { ConversationItem } from '../index'
import { useNavigate, useParams } from 'react-router-dom'

interface PropState {
  conversations: ConversationsResponse[]
}

const ConversationList = (prop: PropState) => {
  const { conversationId } = useParams<{ conversationId: string }>()
  const { conversations } = prop
  const navigate = useNavigate()

  useEffect(() => {
    if (conversations[0] && !conversationId) navigate(String(conversations[0].id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rendered = conversations.map((conversation) => (
    <div key={conversation.id}>
      <ConversationItem conversation={conversation} />
    </div>
  ))
  return (
    <div>
      <div>{rendered}</div>
    </div>
  )
}

export default ConversationList
