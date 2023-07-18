import { useGetConversationsQuery } from '../../../redux/api/conversationApi'
import { ConversationList, HeaderMessage } from '../index'

const SidebarMessage = () => {
  const { data: conversations } = useGetConversationsQuery(undefined)
  return (
    <div>
      <HeaderMessage />
      <div>{conversations && <ConversationList conversations={conversations} />}</div>
    </div>
  )
}

export default SidebarMessage
