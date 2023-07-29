import { ConversationList, MessageHeader } from '../index'
import { RootState, useAppSelector } from '../../../redux/store'

const MessageSidebar = () => {
  const conversations = useAppSelector((state: RootState) => state.conversations)
  return (
    <div>
      <MessageHeader />
      <div>{conversations && <ConversationList conversations={conversations} />}</div>
    </div>
  )
}

export default MessageSidebar
