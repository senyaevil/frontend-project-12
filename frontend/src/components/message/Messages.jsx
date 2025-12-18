import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useGetChannelsQuery, useGetMessagesQuery } from '../../store/middlewares/index'
import Message from './Message.jsx'

const Messages = () => {
  const { t } = useTranslation()
  const { data: channels } = useGetChannelsQuery()
  const { data: messages } = useGetMessagesQuery()

  const activeChannelId = useSelector(state => state.ui.activeChannelId)

  const channel = channels?.find(({ id }) => id === activeChannelId)
  const filteredMessages = messages?.filter(({ channelId }) => channelId === activeChannelId)

  return (
    <>
      <div className="bg-light mb-4 p-3 rounded-3 shadow-sm small">
        <p className="m-0 fw-bold">{`# ${channel?.name}`}</p>
        <span className="text-muted">{`${filteredMessages.length} ${t('message.messageCount', { count: filteredMessages.length })}`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-4">
        {filteredMessages.map(filteredMessage => (
          <Message key={filteredMessage.id} data={filteredMessage} />
        ))}
      </div>
    </>
  )
}

export default Messages