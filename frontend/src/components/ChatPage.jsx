import { useGetChannelsQuery, useGetMessagesQuery } from '../store/middlewares'
import { Channels } from './channel'
import { MessageForm, Messages } from './message'
import { Modal } from './modal'
import Spinner from './Spinner.jsx'

const ChatPage = () => {
  const { isLoading: isChannelsLoading } = useGetChannelsQuery()
  const { isLoading: isMessagesLoading } = useGetMessagesQuery()
  const isLoading = isChannelsLoading || isMessagesLoading

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="h-100 container my-4 overflow-hidden rounded-3 shadow">
        <div className="h-100 flex-md-row row bg-white">
          <div className="h-100 d-flex flex-column col-4 col-md-3 border-end px-1 bg-light">
            <Channels />
          </div>
          <div className="h-100 d-flex flex-column col p-2">
            <Messages />
            <MessageForm />
          </div>
        </div>
      </div>
      <Modal />
    </>
  )
}

export default ChatPage