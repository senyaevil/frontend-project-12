import { io } from 'socket.io-client'
import Api from './store/middlewares'
import { actions } from './store'

const socketInit = (store) => {
  const socket = io()
  const { channelsApi, messagesApi } = Api

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload)
    }))
  })

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload)
    }))
  })

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const channel = draftChannels.find((item) => item.id === payload.id)
      channel.name = payload.name
    }))
  })

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const newChannels = draftChannels.filter((channel) => channel.id !== payload.id)
      const state = store.getState()

      if (state.ui.activeChannelId === payload.id) {
        store.dispatch(actions.setActiveChannelId({ id: state.ui.defaultChannelId }))
      }

      return newChannels
    }))
  })
}

export default socketInit
